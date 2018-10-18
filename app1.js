/*const vm = new Vue({
    el: '#app',
    data: {
      results: []
    },
    mounted() {
      axios.get("https://api.nytimes.com/svc/topstories/v2/home.json?api-key=2efcc4b0db5b4859979baa0f40156792")
      .then(response => {this.results = response.data.results})
      //axios.get("http://127.0.0.1:5000/")
      //.then(response => {this.results = response.data})
      //console.log(results)
    }
  });*/

const SECTIONS = "Development, Infrastructure, Data Science";
const subDev = "Web, Mobile";
const subInf = "ERP, IT Admin/Services";
const subDs = "Big Data, Business Intelligence, Machine Learning";


const BaseUrl = "http://127.0.0.1:5000/";


function buildUrl(url) {
    
    return BaseUrl + url
}

Vue.component('news-list', {
    props: ['results'],
    template: `
        <section>
            <table class="ui very basic padded striped four column table accordion">
                        
                        <thead>
                            
                                <th class="thirteen wide">Titel</th>
                                <th class="one wide">Veröffentlichung</th>
                                <th class="one wide">Ort</th>
                                <!--            <th class="one wide">Kategorie</th> -->
                                <th class="one wide">Quelle</th>
                                <th class="one wide">Cockpit</th>
                            </tr>
                        </thead>
                        <tbody>
                            <div v-for="posts in processedPosts">
                                <div v-for="post in posts">
                                <hr>
                                
                                    <tr>
                                        
                                        <td>
                                            <div class="title">
                                            <a :href="post.url" target="_blank"><b>{{ post.title }}</b></a>
                                            </div>
                                            <p>{{ post[amount]}} results shown out of {{ amount }} {{ selected }} projects </p>
                                            <div class="content">
                                                <div class="ui relaxed divided items">
                                                    <div class="item">
                                                        <div class="description">
                                                            {{ post.description.slice(0,350) }}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="ui relaxed divided items">
                                                    <div class="item">
                                                        <div class="description">
                                                            Category: <b>{{ post.bereich.group }}</b>
                                                        </div>
                                                        <div class="description">
                                                        
                                                            Sub-Category: <b>{{ post.bereich.group_type }}</b>
                                                        </div>
                                                        <div class="description">
                                                            Date Posted: <b>{{ post.date_post }}</b>
                                                        </div>
                                                        <div class="description">
                                                            Bundesland <b>{{ post.region.bundesland }}</b>, Stadt: <b>{{ post.region.stadt }}</b>
                                                        </div>
                                        


                                                    </div>
                                                </div>
                                            </div>
                                            
                                        </td>
                                    </tr>
                                </div>
                            </div>
                        </tbody>
             </table>
        </section>`,
    computed: {
        processedPosts() {
            let posts = this.results;

            // Add image_url attribute


            // Put Array into Chunks
            let i, j, chunkedArray = [], chunk = 4;
            for (i = 0, j = 0; i < posts.length; i += chunk, j++) {
                chunkedArray[j] = posts.slice(i, i + chunk);
            }
            return chunkedArray;
        }
    }
});

const vm = new Vue({
    el: '#app',
    data: {
        results: [],
        sections: SECTIONS.split(', '), // create an array of the sections
        subDev1: subDev.split(', '),
        subInf1: subInf.split(', '),
        subDs1: subDs.split(', '),
        section: 'home', // set default section to 'home'
        dev: false,
        inf: false,
        ds: false,
        selected: [],
        options: [
        { text: 'Development', value: this.subDev1 },
        { text: 'Infrastructure', value: this.subInf1 },
        { text: 'Data Science', value: this.subDs1 }
        ]
    },
    mounted() {
        this.getPosts(this.section);
    },
    methods: {
        getPosts(section) {
            //let url = section === "home"? buildUrl(section) : buildUrl(section) + "/" + sub;
            //let url = buildUrl(section) + "/Web";
            let url
            if (section === "home") {
               url = buildUrl(section);
               
            }
            else if (section === "Development") {
                url = buildUrl(section);
                console.log(section)
                this.inf = false;
                this.ds = false;
                this.dev = true;
            }
            else if (section === "Infrastructure") {
               url = buildUrl(section);
               this.dev = false;
               this.ds = false;
               this.inf = true;

            }
            else if (section === "Data Science") {
               url = buildUrl(section);
               this.dev = false;
               this.inf = false;
               this.ds = true;
            }
            console.log(url)
            axios.get(url).then((response) => {
                this.results = response.data;
            }).catch(error => { console.log(error); });
        }
    }
});