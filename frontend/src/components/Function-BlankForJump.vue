
<script>
export default {
  name: '',
  data () {
    return {
      petIndex: this.$route.params.petIndex,
      uniqueId: this.$route.params.uniqueId
    }
  },
  mounted: function () {
    this.$router.replace({name: 'GameMain', params: {petIndex: this.petIndex, uniqueId: this.uniqueId}})
  }
}
</script>

<style scoped>

</style>
