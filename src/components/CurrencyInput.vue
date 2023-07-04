<template>
  <el-input ref="inputRef" :value="formattedValue" />
</template>

<script>
import useCurrencyInput from "vue-currency-input";
import { watch } from '@vue/composition-api' 

export default {
  name: "CurrencyInput",
  props: {
    value: Number,
    options: Object,
  },
  setup(props) {
    const { inputRef, formattedValue, setValue } = useCurrencyInput(props.options);

    watch(() => props.value, (value) => { // Vue 2: props.value
      setValue(value)
    })

    return { inputRef, formattedValue };
  },
  methods:{
    clearValue(){
      this.inputRef.clear()
    }
  }
};
</script>
