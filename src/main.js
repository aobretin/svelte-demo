import ToDo from './ToDo.svelte';

const ToDoApp = new ToDo({
	target: document.body,
	props: {
		URL: 'https://jsonplaceholder.typicode.com/todos'
	}
});

export default ToDoApp;
