<template>
  <div ref="draggableContainer">
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import type { PropType } from 'vue'
import Sortable from 'sortablejs'

const draggableContainer = ref<HTMLDivElement | null>(null)

const props = defineProps({
  modelValue: {
    type: Array as PropType<any[]>,
    default: () => []
  },
  // 参考：https://github.com/SortableJS/Sortable#options
  options: {
    type: Object as PropType<Sortable.Options>,
    default: () => {}
  }
})

interface EmitsType {
  (e: 'update:model-value', value: any[]): void
}

const emit = defineEmits<EmitsType>()

onMounted(() => {
  initDraggable()
})

const initDraggable = () => {
  if (!draggableContainer.value) {
    console.error('容器不能为空')
    return
  }
  const sortable = Sortable.create(draggableContainer.value, {
    animation: 300,
    onUpdate (e) {
      if (e.oldIndex !== undefined && e.newIndex !== undefined) {
        // 删除拖拽的元素
        const list = props.modelValue.slice(0)
        const item = list.splice(e.oldIndex, 1)[0]
        // 把删除的元素放到新的位置
        list.splice(e.newIndex, 0, item)
        emit('update:model-value', list)
        // console.log(e, props.modelValue)
      }
    },
    ...props.options
  })
  console.log(sortable)
}
</script>

<style lang="scss" scoped>
:deep(.el-tag) {
  margin-right: 5px;
}
</style>
