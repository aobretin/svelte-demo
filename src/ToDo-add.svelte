<script>
  import { createEventDispatcher } from 'svelte';

  export let todos = [];

  let todoText = '';
  const dispatch = createEventDispatcher();

  $: emptyTodoText = !todoText.length;

  function addToDo() {
    if (emptyTodoText) return;

    dispatch('addToDoEvent', {
      userId: 1,
      title: todoText,
      completed: false,
      id: todos.length + 1
    });

    todoText = '';
  }
</script>

<div class="text-center mb-5">
  <div class="input-group">
    <input
      on:keydown={({keyCode}) => {if (keyCode === 13) addToDo()}}
      bind:value={todoText}
      type="text"
      class="form-control"
      placeholder="Add todo..."
    />
    <div class="input-group-append">
      <button
        disabled={emptyTodoText}
        on:click={addToDo}
        class="btn btn-primary"
        type="button"
      >
        +
      </button>
    </div>
  </div>
</div>
