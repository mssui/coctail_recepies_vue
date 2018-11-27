<template>
    <div class="add-smoothie container">
        <h2 class="center-align indigo-text">Add Cocktail Receipe</h2>
        <form @submit.prevent="Addsmoothie">
            <div class="field title">
                <label for="title">Cocktail Name</label>
                <input type="text" name="title" v-model="title">
            </div>
            <div class="field" v-for="(ing, index) in ingredients" :key="index">    
                <label for="ingredient">Ingredients :</label>
                <input class="chip" type="text" name="ingredient" v-model="ingredients[index]">
                <i class="material-icons delete" @click="deleteIng(ing)">delete</i>
            </div>
            <div class="field add-ingredient">
                <label for="add-ingredient"> Add ingredient</label>
                <input type="text" name="add-ingredient" @keydown.tab.prevent="addIng" v-model="another">
            </div>
            
            <div class="field center-align">
                <p v-if="feedback" class="red-text">{{ feedback }}</p>
                <button class="btn pink">ADD Cocktail</button>
            </div>
        </form>
    </div>
</template>

<script>
import db from '@/firebase/init'
import slugify from 'slugify'
export default {
    name: 'Addsmoothie',
    data(){
        return{
            title: null,
            another: null,
            feedback:null,
            ingredients: [],
            slug: null
        }
    },
    methods: {
        Addsmoothie(){
            if (this.title) {
                this.feedback = null
                //create a slug
                this.slug = slugify(this.title, { 
                    replacement: '-',
                    remove: /[*+~.()'"!:@]/g,
                    lower : true
                })
               db.collection('smoothies').add({
                   title: this.title,
                   ingredients: this.ingredients,
                   slug: this.slug
             } ).then(()=>{
                 this.$router.push({name:'Index'})
                 
             })
            } else {
                this.feedback= "fill the title"
            } 
            },

        addIng(){
            if(this.another){
            this.ingredients.push(this.another)
            console.log(this.ingredients)
            this.another = null
            this.feedback = null
}
            else{
                this.feedback = "You must add a value as ingrident"
            }
            
        },
        deleteIng(ing){
            this.ingredients = this.ingredients.filter(ingredient => {
                return ingredient != ing
            })
        }
    }
}
</script>
<style>
.add-smoothie {
    margin-top: 60px;
    padding: 20px;
    max-width: 600px;
}
.add-smoothie h2{
    font-size: 28px;
}
.chipbox li{
    display: inline-block;
}
.add-smoothie .field{
    margin: 20px auto;
    position: relative;
}
.add-smoothie .delete{
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    cursor: pointer;
    font-size: 1.4em;
}
</style>

