<!-- Clayton DeSimone
     Client Side Programming
     Task 2
     12/11/2023 -->

<!--
  In this web application, I designed a game that a user can play for fun. Users would be anyone who wants to play
   a game where they can customize their own character, choose a quest location, and make decisions based on the 
   obstacles present in that location. What this web app aims to do is give the user a fun experience and demonstrate 
   my knowledge and application of using Vue and using an API to retrieve and store user data.
-->

<!-- Using classes and styles from bulma and John Papa's Vue Getting Started tutorial https://github.com/johnpapa/vue-getting-started -->

<template>
  <div class="content-container">
    <div class="columns">
      <div class="column is-8">
        <div class="section content-title-group">
          <h1 class="title">Medieval Quest</h1>
          <!-- https://th.bing.com/th/id/R.2d5e0b98d82684865ba8e1c32cb14d24?rik=pFCTpKs6Avl2aA&riu=http%3a%2f%2fmedia.cntraveler.com%2fphotos%2f56e20de2a69cef316dc99c9f%2fmaster%2fpass%2fneuschwanstein-castle-germany-cr-getty.jpg&ehk=myvlph%2fnYXfUx8eEZuEM9Khn7wa0blv3%2bm1B0EAlj6Y%3d&risl=&pid=ImgRaw&r=0 -->
          <img alt="castle" src="../assets/castle.png">
          <p>You find yourself in the middle of an ancient kingdom. You are hoping to make a name for yourself 
            among the royalty and achieve knighthood status. First you must decide who you want to be...</p><br>

          <label for="userName">Enter your name: </label>
          <input type="text" id="userName" v-model="userName" :class="{ invalid: errorMessage }">
          <div v-show="errorMessage" class="error-message" v-text="errorMessage"></div>

          <label for="namecontinue"><br><br>Press Continue To Begin:</label><br>
          <input type="button" id="namecontinue" name="namecontinue" class="continuebuttons" @click="verifyName()" value="Continue">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { dataService } from '../shared';

  export default {
  name: 'HomeView',
  data() {
    return {
      userName: "",
      user: {},
      errorMessage: ""
    };
  },
  async created() {
    this.user = await dataService.getUserCharacter(0);
  },
  methods: {
      // verifies the user name entered is not blank
      verifyName() {
        if (this.userName !== "") {
          this.saveUser();
        }
        else {
          console.log("No user name entered");
          this.errorMessage = "Please enter your name";
        }
      },
      async saveUser() {
        this.user.name = this.userName;
        console.log(`Save character name: ${this.userName}`);
        await dataService.updateUserCharacter(this.user);
        this.$router.push({ name: 'characterDesign' });
      },
    }
  }
</script>
