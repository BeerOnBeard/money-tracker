<template>
<div>
  <div v-if="transactions === undefined">No data</div>
  <table v-if="transactions !== undefined">
    <thead>
      <tr>
        <td>Amount</td>
        <td>Date</td>
        <td>Description</td>
        <td>Category</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="transaction in transactions" v-bind:key="transaction.id">
        <td>${{ transaction.amount.toFixed(2) }}</td>
        <td>{{ transaction.date }}</td>
        <td>{{ transaction.description }}</td>
        <td>{{ transaction.category }}</td>
      </tr>
    </tbody>
  </table>
</div>
</template>

<script>
export default {
  props: {
    transactions: undefined
  }
}
</script>