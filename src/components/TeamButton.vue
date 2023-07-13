<template>
  <button @click="$emit('click')" class="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded">
    Team ({{ selectedCharacterCount }})
  </button>
</template>

<script>
export default {
  props: {
    selectedCharacterCount: {
      type: Number,
      required: true
    }
  }
};
</script>

<style>
/* Add your button styles here */
.bg-gray-300 {
  /* Set the background color of the button */
  background-color: #d1d5db;
}

.hover\:bg-gray-400:hover {
  /* Set the background color of the button when hovered */
  background-color: #9ca3af;
}

.text-black {
  /* Set the text color of the button */
  color: #000000;
}

.font-bold {
  /* Set the font weight of the button */
  font-weight: bold;
}

.py-2 {
  /* Set the vertical padding of the button */
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.px-4 {
  /* Set the horizontal padding of the button */
  padding-left: 1rem;
  padding-right: 1rem;
}

.rounded {
  /* Set the border radius of the button */
  border-radius: 0.375rem;
}
</style>
