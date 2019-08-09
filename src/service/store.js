const base = {
  host: 'https://api.bdxmx.com',
}

export default {
  $store: base,
  get(key) {
    return this.$store[key]
  },
  set(key, value) {
    this.$store[key] = value
  },
}
