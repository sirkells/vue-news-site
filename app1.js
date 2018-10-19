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
const devWeb = "Fullstack, Backend, Frontend"
const class_buttons = "btn btn-primary, btn btn-info, btn btn-warning"
//var country_selected = document.getElementById("Sub");

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
        section1: [{group: "Development", button: "btn btn-primary", width: "width:50%"}, {group: "Infrastructure", button:"btn btn-info", width: "width:30%"}, {group:"Data Science", button: "btn btn-warning", width: "width:20%"}],
        sections: SECTIONS.split(', '), // create an array of the sections
        class_buttons1: class_buttons.split(', '),
        subDev1: subDev.split(', '),
        subInf1: subInf.split(', '),
        subDs1: subDs.split(', '),
        devSub: devWeb.split(', '),
        section: 'home', // set default section to 'home'
        isActive: true,
        devSub1: false,
        dev: false,
        inf: false,
        ds: false,
        selected: [],
        options: [
        { text: 'Development', value: this.subDev1 },
        { text: 'Infrastructure', value: this.subInf1 },
        { text: 'Data Science', value: this.subDs1 }
        ],
        total_project_count: 0,
        current_project_count: 0

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
            else if (section === "Development/Web") {
                url = buildUrl(section);
                console.log(section)
                this.inf = false;
                this.ds = false;
                this.dev = true;
                this.devSub1 = true;
            }
            console.log(url)
            axios.get(url).then((response) => {
                this.results = response.data.project_lists;
                this.total_project_count = response.data.amount
                this.current_project_count = response.data.amount2
                console.log(this.total_project_count)
                console.log(this.current_project_count)
                console.log(this.results)
                //console.log((response.data.project_lists).length)
            }).catch(error => { console.log(error); });
        }
    }
});