<template>
  <input type="file" v-on:change="handleChange" />
</template>

<script>
import Papa from 'papaparse';
import { TransactionBuilder } from 'money-tracker';

export default {
  props: {
    value: Array
  },
  methods: {
    handleChange(event) {
      Papa.parse(event.target.files[0], { complete: result => {
        let transactions = TransactionBuilder.build(result.data);
        this.$emit('input', transactions)
      }});
    }
  }
}
</script>
