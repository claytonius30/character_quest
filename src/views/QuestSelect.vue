<!-- Clayton DeSimone
     Client Side Programming
     Task 2
     12/11/2023 -->

<!-- Using classes and styles from bulma and https://github.com/johnpapa/vue-getting-started -->

<template>
  <div class="content-container">
    <div class="columns">
      <div class="column is-8">
        <div class="section content-title-group">
          <h1 class="title">Quest Select</h1>
          <p v-if="this.userCharacter.name"><br>{{ userCharacter.type }} {{ userCharacter.name }}, please select a quest direction:</p><br>
          <ul>
            <!-- Displays each location from 'locations' array in characterdata.json -->
            <li v-for="loc in locations" :key="loc.id">
              <div class="card">
                <div class="card-content">
                  <div class="content" @click="toggleDescription(loc.direction)">
                    <div :key="loc.direction">
                      <h2>{{ loc.direction }} - <i class="loc-name">{{ loc.name }}</i></h2><br>
                      <!-- mountains https://i.redd.it/lwu37mu5jmz21.jpg -->
                      <img v-if="loc.direction === 'North'" alt="mountains" src="../assets/mountains.png">
                      <!-- https://3.bp.blogspot.com/-hkkGXTYJTJ0/WBwF-Xn96OI/AAAAAAAAAC4/EEGf3APAYsgNMyrlUnjnnnD_iE7I6sktQCLcB/s1600/K3.jpg -->
                      <img v-if="loc.direction === 'East'" alt="desert2" src="../assets/desert2.png">
                      <!-- swamp https://th.bing.com/th/id/R.b13cec20d02b29707efb9a59d41ffbfe?rik=HPxPtN2AEsQz9A&riu=http%3a%2f%2fi1.wp.com%2flistverse.com%2fwp-content%2fuploads%2f2012%2f11%2fswamp1.jpg&ehk=wzxPVXuAD6n4NrLjJEjNEHHaYpVKfVrrx438BCBXshA%3d&risl=&pid=ImgRaw&r=0 -->
                      <img v-if="loc.direction === 'South'" alt="swamp" src="../assets/swamp.png">
                      <!-- woods https://wallpaperaccess.com/full/128765.jpg -->
                      <img v-if="loc.direction === 'West'" alt="woods" src="../assets/woods.png">
                    </div>
                  </div>
                  <!-- Display description for the selected location type -->
                  <p v-if="selectedLocation(loc.direction)">{{ getDescriptionForLocation(loc.direction) }}</p>
                </div>
                <footer class="card-footer">
                  <!-- Displays 'Choose' button once location is selected -->
                  <button v-if="selectedLocation(loc.direction)" class="link card-footer-item" @click="selectLocation(loc)">
                    <i class="fas fa-save"></i>
                    <!-- Class binding keeps selection highlighted when clicked -->
                    <span :class="{ 'selected-item': selectedLocName === loc.name }">Choose</span>
                  </button>
                </footer>
              </div>
            </li>
          </ul>
          <!-- Displays prompt to continue with selected location along with 'Not Yet' and 'Yes' buttons -->
          <p v-if="selectedLocName">Are you ready to embark on your quest to the {{ selectedLocName }}?</p><br>
          <footer class="card-footer">
            <button v-if="selectedLocName" class="link card-footer-item cancel-button" @click="cancelLocation()">
              <i class="fas fa-undo"></i>
              <span>Not Yet..</span>
            </button>
            <button v-if="selectedLocName" class="link card-footer-item" @click="saveLocation()">
              <i class="fas fa-undo"></i>
              <span>Yes!!</span>
            </button>
          </footer>
        </div>
        <!-- Shows message until character data is loaded -->
        <div class="notification is-info" v-show="message">{{ message }}</div>
      </div>
    </div>
  </div>
</template>
  
<script>
  import { dataService } from '../shared';

  export default {
    // eslint-disable-next-line
    name: 'Locations',
    data() {
      return {
        locations: [],
        userCharacter: {},
        selectedDirection: null,
        selectedDescription: null,
        selectedLocName: null,
        selectedLocObj: {},
        message: ''
      };
    },
    async created() {
      await this.loadQuestData();
    },
    methods: {
      async loadQuestData() {
        this.locations = [];
        this.userCharacter = {};
        this.userCharacter = await dataService.getUserCharacter(0);
        this.message = 'getting locations, please be patient';
        this.locations = await dataService.getLocations();
        this.message = '';
      },
      // Shows location description when user clicks on a location
      toggleDescription(dir) {
        this.selectedDescription = null;
        this.selectedDirection = dir;
      },
      // Indicates if location is chosen allowing description to display
      selectedLocation(dir) {
        return this.selectedDirection === dir;
      },
      // Returns the selected location description from 'locations' array in characterdata.json
      getDescriptionForLocation(dir) {
        const selectedLoc = this.locations.find(loc => loc.direction === dir);
        this.selectedDescription = selectedLoc.description;
        // Returns empty string if location not found
        return selectedLoc ? selectedLoc.description : '';
      },
      // When run, allows final prompt to appear and saves the location object
      selectLocation(loc) {
        this.selectedLocName = loc.name;
        this.selectedLocObj = loc;
      },
      cancelLocation() {
        this.selectedLocName = null;
        console.log("Canceled location selection");
      },
      // Updates userCharacter object in characterdata.json with location selections
      async saveLocation() {
        // Stores location object within userCharacter object
        this.userCharacter.location = this.selectedLocObj;
        console.log(`Save character location: ${this.selectedLocObj.name}`);
        await dataService.updateUserCharacter(this.userCharacter);
        this.$router.push({ name: 'journey' });
      },
    },
  }
</script>
