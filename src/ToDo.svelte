<script>
	import axios from 'Axios';
	import { onMount } from 'svelte';
	import ToDoList from './ToDo-list.svelte';
	import ToDoAdd from './ToDo-add.svelte';

	export let URL;

	let promise = getTodos();
	let todos = [];
	let toHighlight = '';

	$: doneTodos = todos.filter(todo => todo.completed);
	$: notDoneTodos = todos.filter(todo => !todo.completed);

	function toggleToDoEvent({detail: id}) {
		const todoIndex = todos.findIndex(todo => todo.id === parseInt(id));
		todos[todoIndex].completed = !todos[todoIndex].completed;
	}

	function addToDoEvent({detail: newToDo}) {
		todos = [
			newToDo,
			...todos
		]
	}

	function dragStartEvent({detail: data}) {
		if (data.completed) {
			toHighlight = 'not-done';
		} else {
			toHighlight = 'done';
		}

    data.e.dataTransfer.setData("text", JSON.stringify(data));
  }

	function dragOverEvent(e) {
		e.preventDefault();
		e.dataTransfer.dropEffect = 'move';
	}

	function dropEvent(e) {
		e.preventDefault();

		const dragData = JSON.parse(e.dataTransfer.getData("text"));
		const completed = this.classList.contains('done');

		toHighlight = '';

		if (completed !== dragData.completed) {
			toggleToDoEvent({
				detail: dragData.id
			})
		}
	}

	function dragEndEvent() {
		toHighlight = '';
	}

	async function getTodos() {
		const { data } = await axios.get(URL);
	 	todos = data.slice(0, 10);
	}
</script>

<style>
	.done,
	.not-done {
		transition: transform .5s, opacity .5s;
	}

	.show-drag {
		transform: scale(1.1);
	}

	.hide-drag {
		opacity: .2;
	}
</style>

<div class="container">
	<h1 class="text-center">Todo checker</h1>
	{#await promise}
		<h2 class="text-center mt-5">Awaiting todos...</h2>
	{:then todos}
		<ToDoAdd
			todos={todos}
			on:addToDoEvent={addToDoEvent}
		/>

		<div class="row">
			<div
				on:drop={dropEvent}
				on:dragover={dragOverEvent}
				on:dragend={dragEndEvent}
				class:show-drag={toHighlight === 'not-done'}
				class:hide-drag={toHighlight === 'done'}
				class="not-done col-sm-6 col-xs-12"
			>
				<ToDoList
					todos={notDoneTodos}
					on:toggleToDoEvent={toggleToDoEvent}
					on:dragStartEvent={dragStartEvent}
				/>
			</div>

			<div
				on:drop={dropEvent}
				on:dragover={dragOverEvent}
				on:dragend={dragEndEvent}
				class:show-drag={toHighlight === 'done'}
				class:hide-drag={toHighlight === 'not-done'}
				class="done col-sm-6 col-xs-12"
			>
				<ToDoList
					todos={doneTodos}
					on:toggleToDoEvent={toggleToDoEvent}
					on:dragStartEvent={dragStartEvent}
				/>
			</div>
		</div>
	{:catch error}
		<h2 class="text-center mt-5">OOOPS....</h2>
	{/await}
</div>
