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
          <h1 class="title">Journey</h1>
          <!-- https://mir-s3-cdn-cf.behance.net/project_modules/1400/57f71544317715.580f681e5a7ac.jpg -->
          <img alt="questmap" src="../assets/questmap.png">
          <p v-if="this.userCharacter.name"><br>With your {{ userCharacter.weapon.toLowerCase() }} in hand, you make your way to the {{ userCharacter.location.name }}. Just as you enter this area of the kingdom, you encounter your first obstacle..</p><br>
          <div class="card">
            <div class="card-content">
              <div class="content" @click="toggleObstacle('ob1')">
                <h2>Obstacle 1</h2><br>
                <div v-if="encounters.ob1">
                  <!-- Retrieves obstacle1 from userCharacter's location object -->
                  <p>A slew of <b>{{ userCharacter.location.obstacle1 }}</b>!! How will you proceed?</p>
                </div>
              </div>
            </div>
            <!-- Displays once user clicks 'Obstacle 1' -->
            <footer class="card-footer" v-if="encounters.ob1">
              <!-- Removes other option based on which option is clicked -->
              <button class="link card-footer-item" @click="handleOutcome('ob1', 'caution')" v-if="outcomes.ob1 !== 'gusto'">
                <i class="fas fa-undo"></i>
                <!-- Class binding keeps selection highlighted -->
                <span :class="{ 'selected-item': outcomes.ob1 === 'caution' }">With Caution..</span>
              </button>
              <button class="link card-footer-item" @click="handleOutcome('ob1', 'gusto')" v-if="outcomes.ob1 !== 'caution'">
                <i class="fas fa-save"></i>
                <span :class="{ 'selected-item': outcomes.ob1 === 'gusto' }">With Gusto!!</span>
              </button>
            </footer>
          </div>
          <!-- Once obstacle selection is made, shows description of decision outcome -->
          <div v-if="outcomes.ob1">
            <!-- Shows certain outcome description based on obstacle decision -->
            <p v-if="outcomes.ob1 === 'caution'">Your cautious approach was wise and you managed to avoid the {{ userCharacter.location.obstacle1 }}.</p>
            <p v-if="outcomes.ob1 === 'gusto'">Your haphazard approach was reckless and you sustained an injury from the {{ userCharacter.location.obstacle1 }}.</p>
            <p><br>You proceed further {{ userCharacter.location.direction.toLowerCase() }} and come across another obstacle..</p><br>
          </div>
          <!-- Same as first obstacle, requres prior selection to be made in order to display -->
          <div class="card" v-if="outcomes.ob1">
            <div class="card-content">
                <div class="content" @click="toggleObstacle('ob2')">
                <h2>Obstacle 2</h2><br>
                <div v-if="encounters.ob2">
                  <p>Oh no! You are getting bogged down by <b>{{ userCharacter.location.obstacle3 }}</b>! What will you do?</p>
                </div>
              </div>
            </div>
            <footer class="card-footer" v-if="encounters.ob2">
              <button class="link card-footer-item" @click="handleOutcome('ob2', 'hunker')" v-if="outcomes.ob2 !== 'run'">  
                <i class="fas fa-undo"></i>
                <span :class="{ 'selected-item': outcomes.ob2 === 'hunker' }">Hunker down..</span>
              </button>
              <button class="link card-footer-item" @click="handleOutcome('ob2', 'run')" v-if="outcomes.ob2 !== 'hunker'">  
                <i class="fas fa-save"></i>
                <span :class="{ 'selected-item': outcomes.ob2 === 'run' }">Run!!</span>
              </button>
            </footer>
          </div>
          <div v-if="outcomes.ob2">
            <p v-if="outcomes.ob2 === 'hunker'">By seeking cover you were scathed by the {{ userCharacter.location.obstacle3 }}, resulting in an injury.</p>
            <p v-if="outcomes.ob2 === 'run'">By fleeing you managed to escape the {{ userCharacter.location.obstacle3 }}.</p>
            <p><br>At this point, you have grown tired and desperate to find the treasure here in the {{ userCharacter.location.name }}. Out of nowhere a third obstacle presents itself..</p><br>
          </div>

          <div class="card" v-if="outcomes.ob2">
            <div class="card-content">
              <div class="content" @click="toggleObstacle('ob3')">
                <h2>Obstacle 3</h2><br>
                <div v-if="encounters.ob3">
                  <p>Watch out! A<span v-if="userCharacter.location.id === 0">n</span> <b>{{ userCharacter.location.obstacle2 }}</b>!! You are so startled that you drop your {{ userCharacter.weapon.toLowerCase() }}. As you scramble to pick up your weapon, the creature lunges at you! By sheer reflex, you decide to..</p>
                </div>
              </div>
            </div>

            <footer class="card-footer" v-if="encounters.ob3">
              <!-- Removes other 2 options based on which option is clicked -->
              <button class="link card-footer-item" @click="handleOutcome('ob3', 'jump')" v-if="outcomes.ob3 !== 'duck' & outcomes.ob3 !== 'dodge'">
                <i class="fas fa-undo"></i>
                <span :class="{ 'selected-item': outcomes.ob3 === 'jump' }">Jump!</span>
              </button>
              <button class="link card-footer-item"  @click="handleOutcome('ob3', 'duck')" v-if="outcomes.ob3 !== 'dodge' & outcomes.ob3 !== 'jump'">
                <i class="fas fa-save"></i>
                <span :class="{ 'selected-item': outcomes.ob3 === 'duck' }">Duck!</span>
              </button>
              <button class="link card-footer-item"  @click="handleOutcome('ob3', 'dodge')" v-if="outcomes.ob3 !== 'jump' & outcomes.ob3 !== 'duck'">
                <i class="fas fa-save"></i>
                <span :class="{ 'selected-item': outcomes.ob3 === 'dodge' }">Dodge!</span>
              </button>
            </footer>
          </div>
          <!-- Displays once all obstacles have been encountered and decsions made -->
          <div v-if="outcomes.ob3">
            <!-- Interpolates based on obstacle decision outcomes -->
            <p>Because {{ resultText1 }}, the decision to {{ outcomes.ob3 }} {{ resultText2 }}.</p><br>

            <!-- Displays certain final outcome description based on decisionScore -->
            <p v-if="decisionScore === 0">Sadly, you succumbed to your injuries during your quest and perished in the final battle against the {{ userCharacter.location.obstacle2 }}...</p>

            <p v-if="decisionScore === 1">Thus far, you have suffered multiple injuries during you quest so your strength is greatly reduced. However you manage to execute a moderate blow to the {{ userCharacter.location.obstacle2 }} using your {{ userCharacter.weapon.toLowerCase() }}...</p>

            <p v-if="decisionScore === 2">Amazingly, you only suffered a single injury thus far in your quest. You still have enough strength to strike a heavy blow to the {{ userCharacter.location.obstacle2 }} with your {{ userCharacter.weapon.toLowerCase() }}...</p>

            <p v-if="decisionScore === 3">Incredibly, you managed to avoid any injury in your quest thus far. Therefore, you have the strength to execute a powerful blow from your {{ userCharacter.weapon.toLowerCase() }} upon the {{ userCharacter.location.obstacle2 }}...</p>

            <label for="finalcontinue"><br>Press Continue:</label><br>
            <input type="button" id="finalcontinue" name="finalcontinue" class="continuebuttons" @click="saveJourney()" value="Continue">
          </div>
        </div>
        <div class="notification is-info" v-show="message">{{ message }}</div>
      </div>
    </div>
  </div>
</template>
    
<script>
  import { dataService } from '../shared';

  export default {
    // eslint-disable-next-line
    name: 'Journey',
    data() {
      return {
        userCharacter: {},
        // Sets properties to 'true' indicating which obstacle has been encountered
        encounters: {
          ob1: null,
          ob2: null,
          ob3: null,
        },
        // Stores user's outcome selection for each obstacle
        outcomes: {
          ob1: "",
          ob2: "",
          ob3: "",
        },
        // increments when user makes obstacle decision that doesn't cause injury
        decisionScore: 0,
        // Populates based on user's obstacle selections and selected location's obstacles
        resultText1: "",
        resultText2: "",
        message: '',
      };
    },
    async created() {
      await this.loadQuestData();
    },
    methods: {
      async loadQuestData() {
        this.userCharacter = {};
        this.message = 'getting user data, please be patient';
        this.userCharacter = await dataService.getUserCharacter(0);
        this.message = '';
      },
      // Runs when user clickes an obstacle, setting outcome.ob# to 'true'
      toggleObstacle(obstacle) {
        this.encounters[obstacle] = true;
      },
      handleOutcome(obstacle, outcome) {
        // When user clicks an obstacle outcome selection, stores value in outcomes.ob# based on current obstacle
        this.outcomes[obstacle] = outcome;
        if (outcome === 'caution' | outcome === 'run') {
          // increments decisionScore if correct selections are made on first 2 obstacles
          this.decisionScore++;
        }
        console.log(`${obstacle} decision: ${outcome}`);

        // Runs only after obstacle 3 is encountered
        if (this.encounters.ob3) {
          // Variables containing good, bad, and medium selection descriptions
          let good = "was logical and you avoided instant death";
          let medium = "avoided direct impact, although, you sustained an injury";
          let bad = "caused you to immediately be devoured by the beast";

          // Uses certain variables above to populate resultText2 based on obstacle decision and
          // this particular userCharacter.location's final obstacle
          // Varies for the 4 different locations
          if (this.userCharacter.location.obstacle2 === "ice dragon") {
            this.resultText1 = "dragons can fly";
            if (outcome === "jump") {
              this.resultText2 = bad;
              // Sets decisionScore to 0 based on this being the incorrect decision selection
              this.decisionScore = 0;
            } else if (outcome === "duck") {
              this.resultText2 = good;
              // Increments decisionScore based on this particular location.obstacle2 selection
              this.decisionScore++;
            } else if (outcome === "dodge") {
              this.resultText2 = medium;
            }
          }
          if (this.userCharacter.location.obstacle2 === "giant sand worm") {
            this.resultText1 = "worms inhabit the earth";
            if (outcome === "jump") {
              this.resultText2 = good
              this.decisionScore++;
            } else if (outcome === "duck") {
              this.resultText2 = bad;
              this.decisionScore = 0;
            } else if (outcome === "dodge") {
              this.resultText2 = medium;
            }
          }
          if (this.userCharacter.location.obstacle2 === "hideous monster") {
            this.resultText1 = "swamp monsters are water and tree-dwellers";
            if (outcome === "jump") {
              this.resultText2 = good;
              this.decisionScore++;
            } else if (outcome === "duck") {
              this.resultText2 = medium;
            } else if (outcome === "dodge") {
              this.resultText2 = bad;
              this.decisionScore = 0;
            }
          }
          if (this.userCharacter.location.obstacle2 === "goliath spider") {
            this.resultText1 = "spiders aren't confined to the ground";
            if (outcome === "jump") {
              this.resultText2 = bad
              this.decisionScore = 0;
            } else if (outcome === "duck") {
              this.resultText2 = medium
            } else if (outcome === "dodge") {
              this.resultText2 = good;
              this.decisionScore++;
            }
          }
        }
      },
      // Updates userCharacter object in characterdata.json with user's decisionScore
      async saveJourney() {
        this.userCharacter.decisionScore = this.decisionScore;
        console.log(`Save character score: ${this.decisionScore}`);
        await dataService.updateUserCharacter(this.userCharacter);
        this.$router.push({ name: 'result' });
      },
    },
  }
</script>
