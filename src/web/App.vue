<template>
  <div>
   <TransactionParseForm v-model="transactions"/>
   <TransactionTable v-bind:transactions="transactions"/>
  </div>
</template>

<script>
import TransactionParseForm from './TransactionParseForm.vue';
import TransactionTable from './TransactionTable.vue';

export default {
  components: { TransactionParseForm, TransactionTable },
  data() {
    return { transactions: undefined }
  }
}
</script>