<template>
  <v-textarea
    ref="textarea"
    data-cy="stack-textarea"
    :data-test-id="label"
    v-bind="$attrs"
    :label="label"
    :placeholder="placeholder"
    :value="value"
    dense
    :hide-details="(!hint) || hideDetails || dense"
    :rows="rows"
    :hint="hint"
    :disabled="disabled"
    @input="$emit('input', $event)"
    @change="$emit('change', $event)"
  />
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'SpheraTextarea',
  model: { prop: 'value', event: 'change' },
  props: {
    /**
     * Значение инпута
     * @model
     */
    value: { type: [String, Number], default: undefined },
    placeholder: { type: [String], default: ' ' },
    rows: { type: [String, Number], default: 2 },
    hint: { type: String, default: undefined },
    hideDetails: { type: Boolean, default: false },
    dense: { type: Boolean, default: false },
    label: { type: String, default: undefined },
    disabled: { type: Boolean, default: false },
  },
});
</script>
