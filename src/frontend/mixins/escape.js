export default {
  created() {
    let that = this;
    document.addEventListener('keyup', this.onEscPress(that));
  },
  beforeDestroy() {
    let that = this;
    document.removeEventListener('keyup', this.onEscPress(that));
  },
  methods: {
    onEscPress: (that) => (ev) => {
      if (ev.keyCode === 27) that.escape();
    }
  },
};
