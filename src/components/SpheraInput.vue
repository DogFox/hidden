<template>
  <v-text-field
    :value="value"
    :label="label"
    :placeholder="placeholder"
    :messages="messages"
    :hint="hint"
    :clearable="clearable"
    dense
    :prepend-icon="prependIcon"
    :append-icon="appendIcon"
    :prepend-inner-icon="prependInnerIcon"
    :suffix="suffix"
    :type="type"
    :readonly="readonly"
    :disabled="disabled"
    hide-details="auto"
    @click:append="$emit('appendClick')"
    @click:prepend="$emit('prependClick')"
    @click:prepend-inner="$emit('prependInnerClick')"
    @input="$emit('input', $event)"
    @change="$emit('change', $event)"
  />
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'SpheraInput',
  props: {
    /**
     * Значение инпута
     * @model
     */
    value: { type: [String, Number], default: undefined },
    placeholder: { type: [String], default: ' ' },
    messages: { type: String, default: undefined },
    hint: { type: String, default: undefined },
    label: { type: String, default: '' },
    clearable: { type: Boolean, default: false },
    prependIcon: { type: String, default: '' },
    prependInnerIcon: { type: String, default: '' },
    appendIcon: { type: String, default: '' },
    suffix: { type: String, default: '' },
    type: { type: String, default: 'String' },
    readonly: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  data() {
    return {};
  },
});
</script>
