---
title: User interaction
subtitle: MCQ and all
icon: mdi-account
order: 90
---
## Multiple choice
<Mcq :options="['Tabs', '4 Space', '2 Spaces']" valid="Tabs">
    <template v-slot:default>
        What is the **best** method of indenting code (Warning only one right answer)
    </template>
    <template v-slot:right >
        Of course. Welcome to the elite
    </template>
    <template v-slot:wrong>
        Are you out of your mind, Of course the answer is Tabs
    </template>
</Mcq>
<Mcq :options="['Javascript', 'PHP', 'Java']" valid="Javascript" :enablereset="false">
    <template v-slot:default>
        What is the language used for this app ,
    </template>
    <template v-slot:right >
        You guessed right
    </template>
    <template v-slot:wrong>
        Wrong the right answer was Javascript
    </template>
</Mcq>
