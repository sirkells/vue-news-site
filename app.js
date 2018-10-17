const vm = new Vue({
    el: '#app',
    data: {
      results: []
    },
    mounted() {
      axios.get("https://api.nytimes.com/svc/topstories/v2/home.json?api-key=2efcc4b0db5b4859979baa0f40156792")
      .then(response => {this.results = response.data.results})
    }
  });