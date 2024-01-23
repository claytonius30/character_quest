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
          <h1 class="title">Character Types</h1>
          <!-- https://wallpaper.dog/large/5439551.png -->
          <img alt="knight2" src="../assets/knight2.png">
          <p v-if="this.userCharacter.name"><br>Hello {{ userCharacter.name }}, please select your character type:</p><br>
          <ul>
            <!-- Displays each character type from 'characters' array in characterdata.json -->
            <li v-for="charac in characters" :key="charac.id">
              <div class="card">
                <div class="card-content">
                  <div class="content" @click="toggleWeaponList(charac.type)">
                    <div :key="charac.type">
                      <h2>{{ charac.type }}</h2>
                      <p v-if="selectedType(charac.type)">Please select a weapon:</p>
                    </div>
                  </div>
                  <!-- Displays weapon options for the selected character type -->
                  <ul v-if="selectedType(charac.type)">
                    <li v-for="weapon in getWeaponsForCharacterType(charac.type)" :key="weapon">
                      <div @click="selectWeapon(weapon)">
                        <h3>
                          <!-- Class binding keeps selection highlighted when clicked -->
                          <div :class="{ 'selected-item': selectedWeapon === weapon }">{{ weapon }}</div>
                        </h3>
                      </div>
                    </li>
                  </ul>
                </div>
                <!-- Displays 'cancel' and 'save' buttons once weapon is selected -->
                <footer class="card-footer" v-if="selectedType(charac.type)">
                  <button v-if="selectedWeapon" class="link card-footer-item cancel-button" @click="cancelCharacter()">
                    <i class="fas fa-undo"></i>
                    <span>Cancel</span>
                  </button>
                  <button v-if="selectedWeapon" class="link card-footer-item" @click="saveCharacter()">
                    <i class="fas fa-save"></i>
                    <span>Save</span>
                  </button>
                </footer>
              </div>
            </li>
          </ul>
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
    name: 'Characters',
    data() {
      return {
        characters: [],
        userCharacter: {},
        message: '',
        selectedCharacterType: null,
        selectedWeapon: null
      };
    },
    async created() {
      await this.loadQuestData();
    },
    methods: {
      async loadQuestData() {
        this.characters = [];
        this.userCharacter = {};
        this.userCharacter = await dataService.getUserCharacter(0);
        this.message = 'getting character types, please be patient';
        this.characters = await dataService.getCharacters();
        this.message = '';
      },
      // Toggles weapon list display when user clicks on a character type
      toggleWeaponList(type) {
        this.selectedWeapon = null;
        this.selectedCharacterType = this.selectedCharacterType === type ? null : type;
      },
      // Indicates if characterType is chosen allowing weapon list to display
      selectedType(type) {
        return this.selectedCharacterType === type;
      },
      // Returns an array of weapons available for each character type from characterdata.json
      getWeaponsForCharacterType(type) {
        const selectedCharacter = this.characters.find(charac => charac.type === type);
        // Returns empty array if character type not found
        return selectedCharacter ? [selectedCharacter.w1, selectedCharacter.w2, selectedCharacter.w3] : [];
      },
      // When run, allows 'cance' and 'save' buttons to display
      selectWeapon(weapon) {
        this.selectedWeapon = weapon;
      },
      cancelCharacter() {
          this.selectedCharacterType = null,
          this.selectedWeapon = null
          console.log("Canceled type/weapon selection");
      },
      // Updates userCharacter object in characterdata.json with character type selections
      async saveCharacter() {
        this.userCharacter.type = this.selectedCharacterType;
        this.userCharacter.weapon = this.selectedWeapon;
        console.log(`Save character type/weapon: ${this.selectedCharacterType} - ${this.selectedWeapon}`);
        await dataService.updateUserCharacter(this.userCharacter);
        this.$router.push({ name: 'questSelect' });
      },
    },
  }
</script>
