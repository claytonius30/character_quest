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
          <h1 class="title">Quest Result</h1>

          <!-- Displays based on user's decisionScore from prior view (Journey.vue) -->
          <div v-if="userCharacter.decisionScore > 1">
            <!-- https://media.istockphoto.com/photos/treasure-chest-open-ancient-trunk-with-glowing-magic-lights-in-the-picture-id1160778039?k=6&m=1160778039&s=170667a&w=0&h=RRHYkVsNs9zvdRDBpJwrxkiRDqtLsxdaCjfStr0xQNA= -->
            <img alt="chest" src="../assets/chest.png">
            <p v-if="userCharacter.decisionScore == 3">Your final blow caused the {{ userCharacter.location.obstacle2 }} to split open and none other than the hidden treasure tumbles from its belly. You have succeeded in your quest! Congratulations!</p>

            <p v-if="userCharacter.decisionScore == 2">Your final strike to the {{ userCharacter.location.obstacle2 }} caused enough damage for the beast to perish. You notice a bulge in its belly and proceed to extract the hidden treasure. You have succeeded in your quest! Congratulations!</p>
          </div>

          <div v-if="userCharacter.decisionScore == 1">
            <!-- https://i.pinimg.com/originals/fe/5c/c6/fe5cc641d05d8f4280a0507cb04f07c9.jpg -->
            <img alt="exile" src="../assets/exile.png">
            <p>Your last strike to the {{ userCharacter.location.obstacle2 }} manages to dissuade the beast from attacking you and it retreats further into the {{ userCharacter.location.name }}. Although you escaped with your life, you failed to discover the hidden treasure. Unfortunately you did not succeed in your quest and you are exiled from the kingdom.</p><br>
            <p>Farewell {{ userCharacter.name }}!</p>
          </div>

          <div v-if="userCharacter.decisionScore == 0">
            <!-- https://wallpapercave.com/wp/wp2069530.jpg -->
            <img alt="gravestone" src="../assets/gravestone.png">
            <p>Since you were bested by the {{ userCharacter.location.obstacle2 }}, you unfortunately failed in your quest to discover the hidden treasure. Your noble efforts will be remembered.</p><br>
            <p>R.I.P. {{ userCharacter.name }}!</p>
          </div>
          
          <!-- Allows user to change their name if decisionScore is above one (meaning 0 or 1 incorrect decisions made in Journey.vue) -->
          <div v-if="userCharacter.decisionScore > 1">
            <p><br>The queen of the kingdom kights you for dispelling the evil scourge of the {{ userCharacter.location.name }}. She asks if you would like to change your name to something more noble..</p><br>

            <label for="userName">Change your name: </label>
            <input type="text" id="userName" v-model="userName" :class="{ invalid: errorMessage }">
            <div v-show="errorMessage" class="error-message" v-text="errorMessage"></div><br>
            <input type="button" id="namesave" name="namesave" class="continuebuttons" @click="verifyName()" value="Update">
            <div v-if="nameUpdated"><br>
              <!-- https://i.pinimg.com/originals/20/fc/da/20fcda5bbf54b27f18c80f1ac0e3f1da.jpg -->
              <img alt="bestowing" src="../assets/bestowing.png">
              <p><br>Thank you for playing Sir {{ userName }}. May fortune follow you always!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { dataService } from '../shared';

  export default {
  name: 'Result',
  data() {
    return {
      userName: "",
      userCharacter: {},
      nameUpdated: null,
      errorMessage: "",
      message: ""
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
        this.userName = this.userCharacter.name;
      },
      // verifies the user name entered is not blank
      verifyName() {
        if (this.userName !== "") {
          this.saveUser();
          this.nameUpdated = true;
        }
        else {
          console.log("No user name entered");
          this.errorMessage = "Please enter your name";
        }
      },
      // Updates userCharacter object with new name
      async saveUser() {
        this.userCharacter.name = this.userName;
        console.log(`Character name update: ${this.userName}`);
        await dataService.updateUserCharacter(this.userCharacter);
      },
    }
  }
</script>
