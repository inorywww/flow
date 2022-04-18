<template>
  <!-- <svg class="icon" viewBox="0 0 1024 1024" :width="size" :height="size">
    <path d="M512 725.333333a128 128 0 1 1 0 256 128 128 0 0 1 0-256zM469.333333 85.333333L234.666667 682.666667h96l47.786666-128h266.666667l47.786667 128h96L554.666667 85.333333h-85.333334z m-58.88 384L512 199.253333 613.546667 469.333333H410.453333z" p-id="4479"></path>
  </svg> -->
  <!-- <svg t="1650291091250" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2119" :width="size" :height="size">
    <path d="M768 800a31.36 31.36 0 0 1-29.44-19.84L512 214.4l-226.56 565.76a32 32 0 1 1-58.88-24.32l256-640a32.64 32.64 0 0 1 58.88 0l256 640a31.36 31.36 0 0 1-17.28 41.6 29.44 29.44 0 0 1-12.16 2.56z" p-id="2120"></path>
    <path d="M657.92 544H358.4a32 32 0 0 1 0-64h299.52a32 32 0 1 1 0 64zM800 960h-576a32 32 0 0 1 0-64h576a32 32 0 0 1 0 64z" p-id="2121" fill="red"></path>
  </svg> -->
  <svg t="1650291245526" class="icon" viewBox="0 0 1105 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2392" :width="size" :height="size">
    <path d="M632.627 552.632L565.74 353.567l-71.107 199.065h137.994zM534.528 286.72h67.502l159.908 450.56h-65.413l-44.688-134.963H477.553L429.834 737.28H368.64l165.888-450.56z" p-id="2393"></path>
    <path d="M286.72 819.2h573.44v95.88H286.72z" :fill="color" p-id="2394" data-spm-anchor-id="a313x.7781069.0.i5" class="selected"></path>
  </svg>
  
</template>

<script>
export default {
  props: {
    size: {
      default: '24'
    },
    color: {
      default: '#333',
      type: String
    }
  }
}
</script>
