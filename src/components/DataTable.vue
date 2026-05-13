<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th v-for="header in headers" :key="header">{{ header }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.id">
          <slot name="row" :item="item" />
        </tr>
        <tr v-if="data.length === 0">
          <td :colspan="headers.length" class="no-data">
            No hay datos disponibles
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  headers: Array,
  data: Array
});
</script>