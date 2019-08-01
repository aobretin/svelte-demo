<script>
  import { createEventDispatcher } from 'svelte';
  import { slide } from 'svelte/transition';

	export let todos = [];

  const dispatch = createEventDispatcher();

  function toggleToDo(id) {
    dispatch('toggleToDoEvent', id);
  }

  function dragStart(e, id, completed) {
    dispatch('dragStartEvent', { e, id, completed });
  }
</script>

<style>
  .list-group-item {
    flex: 2;
  }

  .completed {
    opacity: .5;
    text-decoration: line-through;
  }
</style>

  <ul class="list-group">
    {#if todos.length}
      {#each todos as {title, id, completed} (id)}
        <div
          class="input-group mb-3"
          class:completed={completed}
          on:dragstart={e => dragStart(e, id, completed)}
          transition:slide
          draggable="true"
        >
          <div class="input-group-prepend">
            <div class="input-group-text">
              <input
                bind:checked={completed}
                on:click={() => toggleToDo(id)}
                type="checkbox"
                aria-label="Checkbox for following text input"
              />
            </div>
          </div>
          <li class="list-group-item">{title}</li>
        </div>
      {/each}
    {:else}
      <li class="list-group-item">
        No tasks here
      </li>
    {/if}
  </ul>
