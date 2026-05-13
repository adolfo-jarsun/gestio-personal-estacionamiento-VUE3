<template>
  <div class="search-bar">
    <input 
      type="text" 
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
    />
    <span class="search-icon">🔍</span>
  </div>
</template>

<script setup>
defineProps({
  modelValue: String,
  placeholder: { type: String, default: 'Buscar...' }
});
defineEmits(['update:modelValue']);
</script>