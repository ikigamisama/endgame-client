<template>
  <div class="relative" v-if="characterSelection">
    <div class="container">
      <div v-if="characterSelection[0].showSelectType" class="player one" :class="{'picking': characterSelection[0].selectType === 1, 'banning': characterSelection[0].selectType === 0}"></div>
      <div v-if="characterSelection[1].showSelectType" class="player two" :class="{'picking': characterSelection[1].selectType === 1, 'banning': characterSelection[1].selectType === 0}"></div>
      <img v-if="showFlash" class="flash" :class="{'picked': flashType === 1, 'banned': flashType === 0}" :src="flash" alt="" @click="hideFlash">
      <h1 class="time">{{time}}</h1>
      <div v-if="isHost" class="controls">
        <el-button type="success" icon="el-icon-back" circle @click="back"></el-button>
        <div>
          <el-button type="danger" icon="el-icon-refresh" circle @click="reset"></el-button>
          <el-button type="primary" icon="el-icon-refresh" circle @click="switchCaptains"></el-button>
        </div>
      </div>
      <div class="ban-panels">
        <el-row type="flex" justify="space-between">
          <el-col :lg="8" :md="10" :sm="24" :xs="24">
            <div class="row">
              <div v-for="(ban, index) in characterSelection[0].selection.bans" :key="index" class="selection ban">
                <img v-if="ban" :src="ban" class="select">
              </div>
              <div v-for="(ban, index) in characterSelection[0].bansRemaining" :key="index" class="selection ban">
                <img class="select">
              </div>
            </div>
          </el-col>
          <el-col :lg="8" :md="4" :sm="24" :xs="24">
            <el-row type="flex" justify="center" align="middle">
              <el-col :lg="12" :md="24">
                <div class="text-align-center">
                  <p v-if="characterSelection[0].showSelectText && !isHost">{{characterSelection[0].selectText}}</p>
                  <p v-if="showRerollText">{{characterSelection[0].rerollText}}</p>
                </div>
              </el-col>
              <el-col :lg="12" :md="24" :xs="24">
                <div class="text-align-center">
                  <p v-if="characterSelection[1].showSelectText && !isHost">{{characterSelection[1].selectText}}</p>
                  <p v-if="showRerollText">{{characterSelection[1].rerollText}}</p>
                </div>
              </el-col>
            </el-row>
          </el-col>
          <el-col :lg="8" :md="10" :sm="24">
            <div class="row-reverse">
              <div v-for="(ban, index) in characterSelection[1].selection.bans" :key="index" class="selection ban">
                <img v-if="ban" :src="ban" class="select">
              </div>
              <div v-for="(ban, index) in characterSelection[1].bansRemaining" :key="index" class="selection ban">
                <img class="select">
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="container picking-section">
      <el-row>
        <el-col :lg="6" :md="6" :sm="6" :xs="7">
          <div>
            <h1 class="fixed-width">{{ characterSelection[0].name }}</h1>
            <div v-for="(pick, index) in characterSelection[0].selection.picks" :key="index" class="selection pick">
              <img v-if="pick" :src="pick" class="select">
            </div>
            <div v-for="(pick, index) in characterSelection[0].picksRemaining" :key="index" class="selection pick">
              <img class="select">
            </div>
            <div v-if="characterSelection[0].showButton" class="forSelection" :class="{'deselect': !characterSelection[0].isTurn, 'pick': selection}" @click="enter">
              <div v-if="!characterSelection[0].isTurn" class="disabled"></div>
              <img :src="characterSelected.image" alt="">
              <div class="text">
                <h5>{{selection ? 'Pick' : 'Ban'}}</h5>
                <h3>{{characterSelected.name}}</h3>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :lg="12" :md="12" :sm="12" :xs="10" class="announce-wrapper">
          <div class="boss">
            <el-button v-if="isHost && !pressed" type="primary" @click="reveal">Boss Reveal</el-button>
            <img v-if="showBoss" :src="require(`@/assets/images/bosses/${boss}.webp`)" class="boss-img" :class="{'large': !showPanel}" alt="">
            <img v-if="showRoulette" src="@/assets/images/bosses/roulette.gif" class="boss-img large" alt="">
          </div>
          <div v-if="rerollButtons">
            <h3>Reroll?</h3>
            <el-row type="flex" justify="center">
              <el-button type="success" @click="vote(1)">Yes</el-button>
              <el-button type="danger" @click="vote(0)">No</el-button>
            </el-row>
          </div>
          <div v-if="!isHost" class="panel-container" :class="{'show': showPanel}">
            <el-scrollbar wrap-class="scrollbar-wrapper">
              <div class="character-panels">
                <div v-for="(row, index) in panels" :key="index" class="panel-col">
                  <img v-for="(character, cIndex) in row.characters" :key="cIndex" :src="character.image" @click="select(character)" class="panel" :class="row.color">
                </div>
              </div>
            </el-scrollbar>
          </div>
          <div v-else class="panel-container character-to-show-appear" :class="{'show': showPanel}">
            <div v-if="showSelectText" class="select-text" :class="{'picking': selection === 1, 'banning': selection === 0}">
              <h1>{{ selectName }}</h1>
              <h3>{{ selectText }}</h3>
            </div>
          </div>
        </el-col>
        <el-col :lg="12" :md="12" :sm="12" :xs="10" class="announce-wrapper-mobile">
          <div class="boss">
            <el-button v-if="isHost && !pressed" type="primary" @click="reveal">Boss Reveal</el-button>
            <img v-if="showBoss & showPanel" :src="require(`@/assets/images/bosses/${boss}.webp`)" class="boss-img"  alt="">
          </div>
       </el-col>
        <el-col :lg="6" :md="6" :sm="6" :xs="7">
          <div v-if="players.length && characterSelection.length">
            <h1 class="fixed-width margin-left">{{ characterSelection[1].name }}</h1>
            <div v-for="(pick, index) in characterSelection[1].selection.picks" :key="index" class="selection pick margin-left">
              <img v-if="pick" :src="pick" class="select">
            </div>
            <div v-for="(pick, index) in characterSelection[1].picksRemaining" :key="index" class="selection pick margin-left">
              <img class="select">
            </div>
            <div v-if="characterSelection[1].showButton" class="forSelection" :class="{'deselect': !characterSelection[1].isTurn, 'pick': selection}" @click="enter">
              <div v-if="!characterSelection[1].isTurn" class="disabled"></div>
              <img :src="characterSelected.image" alt="">
              <div class="text">
                <h5>{{selection ? 'Pick' : 'Ban'}}</h5>
                <h3>{{characterSelected.name}}</h3>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="expand-character-wrapper" v-if="!isHost" :class="{'show': showPanel}" >
      <buttton type="button" class="expander-button" @click="expandCharacters">
          <img :src="paimonIMG" alt="paimon-button-expand-character"/>
      </buttton>
      <div class="character-list-wrapper">
          <div v-if="!isHost" class="panel-container" :class="{'show': showPanel}">
              <el-scrollbar wrap-class="scrollbar-wrapper">
                <div class="character-panels">
                  <div v-for="(row, index) in panels" :key="index" class="panel-col">
                    <img v-for="(character, cIndex) in row.characters" :key="cIndex" :src="character.image" @click="select(character)" class="panel" :class="row.color">
                  </div>
                </div>
              </el-scrollbar>
          </div>
          <div v-if="characterSelection[0].showButton" class="forSelection-mini" :class="{'deselect': !characterSelection[0].isTurn, 'pick': selection}" @click="enter">
            <div v-if="!characterSelection[0].isTurn" class="disabled"></div>
            <img :src="characterSelected.image" alt="">
            <div class="text">
              <h5>{{selection ? 'Pick' : 'Ban'}}</h5>
              <h3>{{characterSelected.name}}</h3>
            </div>
          </div>
          <div v-if="characterSelection[1].showButton" class="forSelection-mini" :class="{'deselect': !characterSelection[1].isTurn, 'pick': selection}" @click="enter">
            <div v-if="!characterSelection[1].isTurn" class="disabled"></div>
            <img :src="characterSelected.image" alt="">
            <div class="text">
              <h5>{{selection ? 'Pick' : 'Ban'}}</h5>
              <h3>{{characterSelected.name}}</h3>
            </div>
          </div>
      </div>
    </div>
    <div class="mobile-modal" :class="[(showBoss && !showPanel ? 'show': ''), (showRoulette ? 'show': ''), (rerollButtons ? 'show': '')]">
      <div class="boss">
          <el-button v-if="isHost && !pressed" type="primary" @click="reveal">Boss Reveal</el-button>
          <img v-if="showBoss" :src="require(`@/assets/images/bosses/${boss}.webp`)" class="boss-img" :class="{'large': !showPanel}" alt="">
          <img v-if="showRoulette" src="@/assets/images/bosses/roulette.gif" class="boss-img large" alt="">
        </div>
        <div v-if="rerollButtons">
          <h3>Reroll?</h3>
          <el-row type="flex" justify="center">
            <el-button type="success" @click="vote(1)">Yes</el-button>
            <el-button type="danger" @click="vote(0)">No</el-button>
          </el-row>
        </div>
        <div v-if="!isHost" class="panel-container" :class="{'show': showPanel}">
          <el-scrollbar wrap-class="scrollbar-wrapper">
            <div class="character-panels">
              <div v-for="(row, index) in panels" :key="index" class="panel-col">
                <img v-for="(character, cIndex) in row.characters" :key="cIndex" :src="character.image" @click="select(character)" class="panel" :class="row.color">
              </div>
            </div>
          </el-scrollbar>
        </div>
        <div v-else class="panel-container character-to-show-appear" :class="{'show': showPanel}">
          <div v-if="showSelectText" class="select-text" :class="{'picking': selection === 1, 'banning': selection === 0}">
            <h1>{{ selectName }}</h1>
            <h3>{{ selectText }}</h3>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import Characters from '../data/characters'
export default {
  data () {
    return {
      characters: Characters,
      default: null,
      noBan: null,
      players: [],
      panels: [],
      characterAssets: [],
      gmAssets: {},
      showPanel: false,
      showRoulette: false,
      showBoss: false,
      showRerollText: false,
      showSelectText: false,
      flash: null,
      flashType: null,
      showFlash: false,
      selectName: '',
      selectText: '',
      selectType: null,
      panelCount: 0,
      isHost: this.$route.query.isHost,
      showSwitchBtn: true,
      userId: null,
      mode: this.$route.query.mode,
      characterSelection: null,
      pressed: false,
      boss: 0,
      rerollButtons: false,
      reroll: false,
      selection: null,
      currentSelecting: null,
      characterSelected: null,
      time: 0,
      paimonIMG: require('@/assets/images/paimon-logo.png')
    }
  },
  created () {
    this.panelCount = parseInt(this.$route.query.mode.charAt(0))
    this.$socket.client.emit('getUser')
    this.$socket.client.emit('getAllCaptainsInRoom', this.$route.params.id)
  },
  mounted () {
    this.panels.push(
      {
        color: 'Pyro',
        characters: this.characters.filter(character => character.vision === 'Pyro')
      },
      {
        color: 'Hydro',
        characters: this.characters.filter(character => character.vision === 'Hydro')
      },
      {
        color: 'Cryo',
        characters: this.characters.filter(character => character.vision === 'Cryo')
      },
      {
        color: 'Electro',
        characters: this.characters.filter(character => character.vision === 'Electro')
      },
      {
        color: 'Anemo',
        characters: this.characters.filter(character => character.vision === 'Anemo')
      },
      {
        color: 'Geo',
        characters: this.characters.filter(character => character.vision === 'Geo')
      }
    )
    this.default = this.characters.filter(character => character.vision === 'Unknown')[0]
    this.noBan = this.characters.filter(character => character.vision === 'x')[0]
    this.preload()
  },
  methods: {
    preload () {
      this.characterAssets = this.characters.map(character => {
        return {
          name: character.name,
          picked: character.picked ? character.picked : false,
          banned: character.banned ? character.banned : false,
          flash: character.flash ? character.flash : false
        }
      })
      this.gmAssets = {
        bossRoll: new Audio(require('@/assets/audio/randomroll.wav')),
        bossReveal: new Audio(require('@/assets/audio/bosspick.wav')),
        teamOneBan: new Audio(require('@/assets/audio/_team 1 ban.wav')),
        teamTwoBan: new Audio(require('@/assets/audio/_team 2 ban.wav')),
        teamOnePick: new Audio(require('@/assets/audio/_team 1 pick.wav')),
        teamTwoPick: new Audio(require('@/assets/audio/_team 2 pick.wav')),
        fileCount: require.context('@/assets/images/bosses', false, /\.(webp)$/).keys().length
      }
    },
    reveal () {
      this.gmAssets.bossRoll.play()
      this.pressed = true
      this.boss = Math.floor(Math.random() * this.gmAssets.fileCount) + 1
      this.showRoulette = true
      setTimeout(() => {
        this.gmAssets.bossReveal.play()
        this.showRoulette = false
        this.showBoss = true
        this.$socket.client.emit('boss', { boss: this.boss, room: this.$route.params.id })
      }, 3000)
    },
    vote (vote) {
      this.$socket.client.emit('reroll', { id: this.userId, reroll: vote })
      this.rerollButtons = false
    },
    select (character) {
      this.characterSelected = character
      this.characterSelection = this.characterSelection.map(info => {
        if (info.id === this.userId) {
          info.showButton = true
        }
        return info
      })
    },
    enter () {
      this.characterSelection = this.characterSelection.map(info => {
        if (info.id === this.userId) {
          info.showButton = false
          info.isTurn = false
        }
        return info
      })
      this.$socket.client.emit('enter', { character: this.characterSelected, selection: this.selection, room: this.$route.params.id, playerId: this.userId })
    },
    addCharacterToSelectionPanel (data) {
      this.characterSelection = this.characterSelection.map(info => {
        if (info.id !== data.playerId) {
          return info
        }
        if (data.selection) {
          info.selection.picks.push(data.character.thumbnail)
          info.picksRemaining--
        } else {
          info.selection.bans.push(data.character.thumbnail)
          info.bansRemaining--
        }
        info.showSelectText = false
        return info
      })
    },
    hideFlash () {
      this.showFlash = false
    },
    switchCaptains () {
      this.$confirm('This will switch the selection sequence.. Continue?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$socket.client.emit('switchCaptain', this.$route.params.id)
      })
    },
    reset () {
      this.$confirm('This will reset the entire room. Continue?', 'Warning', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        this.$socket.client.emit('reset', { room: this.$route.params.id, type: 0 })
      })
    },
    back () {
      this.$router.back()
    },
    expandCharacters () {
      document.querySelector('.expand-character-wrapper').classList.toggle('active')
    }
  },
  sockets: {
    getAllCaptainsInRoom (val) {
      this.players = val
      this.characterSelection = this.players.map(player => {
        return {
          id: player.id,
          name: player.username,
          showButton: false,
          bansRemaining: this.panelCount,
          picksRemaining: this.panelCount,
          selectText: '',
          showSelectText: false,
          selectType: null,
          showSelectType: false,
          isTurn: false,
          rerollText: false,
          selection: {
            picks: [],
            bans: []
          }
        }
      })
    },
    getUser (val) {
      console.log(val)
      this.isHost = val.isHost
      this.userId = val.id
    },
    returnToRoom () {
      this.$router.push(`/room/${this.$route.params.id}`)
    },
    showBoss (data) {
      this.boss = data.boss
      this.showBoss = true
      if (!this.isHost && !data.rerollStatus) {
        this.rerollButtons = true
      }
      if (this.isHost && !data.rerollStatus) {
        this.$socket.client.emit('startTimeReroll', this.$route.params.id)
      } else if (this.isHost && data.rerollStatus) {
        this.$socket.client.emit('countdownToSelect', this.$route.params.id)
      }
    },
    startSelect () {
      this.$socket.client.emit('determineSequence', { room: this.$route.params.id, mode: this.$route.query.mode })
      this.$socket.client.emit('nextTurn', this.$route.params.id)
      this.$socket.client.emit('showPanel', this.$route.params.id)
      this.showSelectText = true
    },
    determineReroll (data) {
      const vote = data.reroll.reduce((votes, info) => votes + info.voteReroll, 0)
      if (vote > 1 && !data.rerollStatus) {
        this.pressed = 0
        this.showBoss = false
        this.showRoulette = false
        this.boss = 0
        this.$socket.client.emit('rerolled')
      } else {
        this.$socket.client.emit('countdownToSelect', this.$route.params.id)
      }
    },
    showReroll (data) {
      this.showRerollText = true
      if (!data.rerollStatus) {
        this.rerollButtons = false
        this.characterSelection = this.characterSelection.map(info => {
          data.captains.forEach(player => {
            if (info.id === player.id) {
              info.rerollText = player.voteReroll ? 'Reroll' : 'No Reroll'
            }
          })
          return info
        })
      }
    },
    showPanel () {
      this.showPanel = true
    },
    select (type) {
      this.characterSelection = this.characterSelection.map(info => {
        if (this.userId === info.id) {
          info.isTurn = true
        }
        return info
      })
      this.selection = type
    },
    removeCharacterFromPanel (data) {
      if (this.isHost) {
        this.$socket.client.emit('stopTimer')
      }
      this.addCharacterToSelectionPanel(data)
      if (!this.isHost) {
        this.panels = this.panels.map(panel => {
          return {
            color: panel.color,
            characters: panel.characters.filter(character => character.name !== data.character.name)
          }
        })
        this.characterSelection = this.characterSelection.map(info => {
          info.isTurn = false
          if (data.playerId === info.id) {
            info.showSelectText = true
          }
          return info
        })
      } else {
        if (data.character.picked && data.character.banned && data.character.flash) {
          const assets = this.characterAssets.find(character => character.name === data.character.name)
          this.flashType = data.selection
          this.flash = assets.flash
          this.showFlash = true
          if (data.selection) {
            assets.picked.play()
          } else {
            assets.banned.play()
          }
        }
        this.showSelectText = false
        setTimeout(() => {
          this.showFlash = false
          this.$socket.client.emit('nextTurn', this.$route.params.id)
        }, 4000)
      }
    },
    counter (time) {
      this.time = time
    },
    pickDefault (data) {
      this.$socket.client.emit('enter', { character: this.noBan, selection: data.selection, room: this.$route.params.id, playerId: data.player.id })
      this.characterSelection = this.characterSelection.map(info => {
        info.isTurn = false
        return info
      })
    },
    announceSelect (data) {
      if (this.isHost) {
        this.gmAssets[data.audio].play()
      }
      this.currentSelecting = data.name
      this.selection = data.type
      this.characterSelected = null
      this.showRerollText = false
      this.showSelectText = true
      this.selectText = `is ${this.selection ? 'picking' : 'banning'}`
      this.characterSelection = this.characterSelection.map(info => {
        info.showButton = false
        info.showSelectText = false
        info.selectType = this.selection
        info.showSelectType = false
        info.selectText = `${info.name} is ${this.selection ? 'picking' : 'banning'}`
        if (data.id === info.id) {
          info.showSelectText = true
          info.showSelectType = true
          this.selectName = info.name
        }
        return info
      })
    },
    hideElements () {
      this.showSelectText = false
      this.showPanel = false
      this.characterSelection = this.characterSelection.map(info => {
        info.showSelectText = false
        info.showSelectType = false
        info.selectText = ''
        return info
      })
    },
    startTimeSelect () {
      this.$socket.client.emit('startTimeSelect')
    },
    reset () {
      this.selection = null
      this.characterSelected = null
      this.boss = 0
      this.time = 0
      this.showPanel = false
      this.showBoss = false
      this.showRoulette = false
      this.showRerollText = false
      this.rerollButtons = false
      this.flash = null
      this.showFlash = false
      this.pressed = false
      this.panels = []
      this.$socket.client.emit('getAllCaptainsInRoom', this.$route.params.id)
      this.panels.push(
        {
          color: 'Pyro',
          characters: this.characters.filter(character => character.vision === 'Pyro')
        },
        {
          color: 'Hydro',
          characters: this.characters.filter(character => character.vision === 'Hydro')
        },
        {
          color: 'Cryo',
          characters: this.characters.filter(character => character.vision === 'Cryo')
        },
        {
          color: 'Electro',
          characters: this.characters.filter(character => character.vision === 'Electro')
        },
        {
          color: 'Anemo',
          characters: this.characters.filter(character => character.vision === 'Anemo')
        },
        {
          color: 'Geo',
          characters: this.characters.filter(character => character.vision === 'Geo')
        }
      )
      document.querySelector('.expand-character-wrapper').classList.remove('active')
    }
  }
}
</script>

<style lang="scss" scoped>
     @media screen and (min-width: 1281px) {
      .container {
        max-width: 90em;
      }
    }
    @media screen and (min-width: 1025px) and (max-width: 1280px) {
      .container {
        max-width: 75em;
      }
    }
    @media screen and (min-width: 769px) and (max-width: 1024px) {
      .container {
        width: 100%;
        .ban-panels {
          .el-row {
            .el-col:nth-child(2) {
              padding: 0;
            }
          }
        }
        .character-panels {
          justify-content: flex-start !important;
        }
      }
    }
    @media screen and (min-width: 481px) and (max-width: 768px) {
      .container {
        width: 100%;
        .ban-panels {
          margin-top: 65px;
          .el-row {
            flex-direction: column;
            .el-col:nth-child(2) {
              padding: 0;
              margin: 10px 0;
              width: 100%;
            }
          }
        }
        .el-row {
          .panel-container {
            .character-panels {
              display: none;
            }
          }
        }
      }
      .forSelection {
        display: none !important;
      }
      .forSelection-mini {
        height: 80px;
        width: 100%;
        border: 1px solid rgb(70, 70, 70);
        overflow: hidden;
        margin: auto;
        display: flex !important;
        justify-content: space-between;
        align-items: center;
        position: relative;
        cursor: pointer;
        background-image: linear-gradient(
          to top,
          #c73535,
          #a5282a,
          #831c1f,
          #641014,
          #460505
        );
        &.deselect {
          pointer-events: none;
        }
        &.pick {
          background-image: linear-gradient(
            to top,
            #2a8f38,
            #1d752c,
            #115c20,
            #064414,
            #012d07
          );
        }
        img {
          margin-left: 1rem;
          height: 130%;
          width: auto;
        }
        .text {
          padding-right: 2rem;
          h5,
          h3 {
            margin: 0;
            text-align: right;
          }
        }
        .disabled {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          background-color: rgba(0, 0, 0, 0.6);
        }
      }
      .expand-character-wrapper {
        position: fixed;
        width: 100%;
        height: 0;
        transition: height 0.25s ease;
        &.show {
          display: block;
        }
        &.active {
          height: 500px;
          transition: height 0.25s ease;
          .expander-button {
            bottom: 87.5%;
          }
          .character-list-wrapper {
            display: block !important;
            position: fixed;
            width: 100%;
            left: 0;
            bottom: 0;
            background-color: #2e2e3a;
            height: 400px;
            .panel-container {
              margin: 15px auto 0 auto;
              max-width: unset;
              padding: 0 10px;
              .character-panels {
                max-height: 250px !important;
              }
            }
          }
        }
      }

    }
    @media screen and (max-width: 480px) {
      h1.time {
        width: 175px !important;
      }
      .container {
        width: 100%;
        .ban-panels {
          margin-top: 65px;
          .el-row {
            flex-direction: column;
            .el-col{
              .row{
                .selection{
                  &.ban{
                    height: 65px;
                  }
                }
              }
            }
            .el-col:nth-child(2) {
              padding: 0;
              margin: 10px 0;
              width: 100%;
            }
          }
        }
        .el-row {
          .panel-container {
            .character-panels {
              display: none;
            }
          }
        }
      }
      .picking-section{
        .el-row{
          display: flex;
          justify-content: space-between;
          width: 100%;
          .el-col{
            padding: 0 !important;
            .selection{
              &.pick{
                width: 115px;
                height: 65px;
                max-width: unset;
              }
            }
          }
        }
      }
      .forSelection {
        display: none !important;
      }
      .forSelection-mini {
        height: 80px;
        width: 100%;
        border: 1px solid rgb(70, 70, 70);
        overflow: hidden;
        margin: auto;
        display: flex !important;
        justify-content: space-between;
        align-items: center;
        position: relative;
        cursor: pointer;
        background-image: linear-gradient(
          to top,
          #c73535,
          #a5282a,
          #831c1f,
          #641014,
          #460505
        );
        &.deselect {
          pointer-events: none;
        }
        &.pick {
          background-image: linear-gradient(
            to top,
            #2a8f38,
            #1d752c,
            #115c20,
            #064414,
            #012d07
          );
        }
        img {
          margin-left: 1rem;
          height: 130%;
          width: auto;
        }
        .text {
          padding-right: 2rem;
          h5,
          h3 {
            margin: 0;
            text-align: right;
          }
        }
        .disabled {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          background-color: rgba(0, 0, 0, 0.6);
        }
      }
      .expand-character-wrapper {
        position: fixed;
        width: 100%;
        height: 0;
        transition: height 0.25s ease;
        .expander-button {
          bottom: 5% !important;
        }
        &.show {
          display: block;
        }
        &.active {
          height: 500px;
          transition: height 0.25s ease;
          .expander-button {
            bottom:75% !important;
          }
          .character-list-wrapper {
            display: block !important;
            position: fixed;
            width: 100%;
            left: 0;
            bottom: 0;
            background-color: #2e2e3a;
            height: 400px;
            .panel-container {
              margin: 15px auto 0 auto;
              max-width: unset;
              padding: 0 10px;
              .character-panels {
                max-height: 250px !important;
              }
            }
          }
        }
      }
      .announce-wrapper{
        display: none !important;
       }
      .announce-wrapper-mobile{
        display: block !important;
        .boss{
          .boss-img{
            max-height: 90px;
          }
        }
       }
      .mobile-modal{
        &.show{
           display: flex !important;
           align-items: center;
           justify-content: center;
           flex-direction: column;
           .boss{
             .boss-img{
               &.large{
                 max-width: 250px !important;
               }
             }
           }
           .panel-container{
             display: none !important;
           }
        }
      }
      .el-scrollbar .scrollbar-wrapper{
        overflow-x: auto !important;
      }
    }
    .relative {
      position: relative;
    }
    .container {
      padding: 1rem;
      position: relative;
      margin: auto;
    }
    .player {
      position: fixed;
      top: 0;
      height: 100%;
      width: 400px;
      &.one {
        left: 0;
        &.banning {
          background-image: radial-gradient(
            20em 100% at left,
            rgba(173, 0, 0, 0.932),
            transparent
          );
        }
        &.picking {
          background-image: radial-gradient(
            20em 100% at left,
            rgba(0, 173, 37, 0.932),
            transparent
          );
        }
      }
      &.two {
        right: 0;
        &.banning {
          background-image: radial-gradient(
            20em 100% at right,
            rgba(173, 0, 0, 0.932),
            transparent
          );
        }
        &.picking {
          background-image: radial-gradient(
            20em 100% at right,
            rgba(0, 173, 37, 0.932),
            transparent
          );
        }
      }
    }
    .controls {
      position: absolute;
      top: 0.5rem;
      width: 100%;
      z-index: 2;
      padding-right: 2rem;
      display: flex;
      justify-content: space-between;
      .el-button {
        margin: 0 0.5rem;
      }
    }
    h1 {
      text-align: center;
      margin: 0 0 1rem;
      &.time {
        clip-path: polygon(30% 100%, 70% 100%, 100% 0, 0 0);
        background-color: #b90000;
        width: 300px;
        font-size: 3rem;
        margin: 0;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        margin: 0 auto;
      }
      &.fixed-width {
        max-width: 192px;
      }
      &.margin-left {
        margin-left: auto;
      }
    }
    .text-align-center {
      text-align: center;
    }
    .panel {
      height: 100px;
      width: auto;
      cursor: pointer;
      margin: 0.3rem 0;
      border-width: 2px;
      border-style: solid;
      &.Pyro {
        border-color: #881d21;
      }
      &.Hydro {
        border-color: #2850a5;
      }
      &.Cryo {
        border-color: #2892a5;
      }
      &.Electro {
        border-color: #6928a5;
      }
      &.Anemo {
        border-color: #28a57b;
      }
      &.Geo {
        border-color: #a5a328;
      }
    }
    .ban-panels {
      margin: 3rem 0 2rem;
    }
    .row {
      display: flex;
      justify-content: flex-start;
    }
    .row-reverse {
      display: flex;
      justify-content: flex-start;
      flex-direction: row-reverse;
    }
    .panel-container {
      max-width: 700px;
      width: 100%;
      margin: 2rem auto;
      transition: 0.2s;
      opacity: 0;
      visibility: hidden;
      &.show {
        opacity: 1;
        visibility: visible;
      }
    }
    .character-panels {
      max-height: calc(100vh - 400px);
      display: flex;
      justify-content: center;
    }
    .panel-col {
      display: flex;
      flex-direction: column;
      margin: 0 0.3rem;
    }
    .el-col {
      padding: 0 1rem;
    }
    .el-card {
      height: 100%;
    }
    .boss {
      display: flex;
      justify-content: center;
      align-items: center;
      .boss-img {
        max-height: 150px;
        height: 100%;
        width: auto;
        transition: 0.2s;
        &.large {
          max-height: 350px;
        }
      }
    }
    h3 {
      text-align: center;
    }
    .select-text {
      text-align: center;
      max-width: 300px;
      margin: auto;
      padding: 1rem 0;
      position: relative;
      &.picking {
        background-image: linear-gradient(
          to right,
          transparent,
          rgba(0, 173, 37, 0.932),
          transparent
        );
      }
      &.banning {
        background-image: linear-gradient(
          to right,
          transparent,
          rgba(173, 0, 0, 0.932),
          transparent
        );
      }
    }
    .flash {
      position: fixed;
      z-index: 2;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      height: 80vh;
      width: auto;
      &.picked {
        background-image: radial-gradient(
          10em 50% at center,
          rgba(0, 173, 37, 0.932),
          transparent
        );
      }
      &.banned {
        background-image: radial-gradient(
          10em 50% at center,
          rgba(173, 0, 0, 0.932),
          transparent
        );
      }
    }
    .selection {
      background-color: rgb(31, 31, 31);
      border: 1px solid rgb(116, 116, 116);
      border-radius: 7px;
      margin-bottom: 0.4rem;
      overflow: hidden;
      .select {
        height: 100%;
        // width: 100%;
        display: block;
        margin: auto;
        object-fit: cover;
        object-position: center;
      }
      &.ban {
        width: 130px;
        height: 80px;
        &:nth-child(2) {
          margin-right: 0.5rem;
          margin-left: 0.5rem;
        }
      }
      &.pick {
        height: 108px;
        max-width: 192px;
        &.margin-left {
          margin-left: auto;
        }
      }
    }
    .right {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
    .left {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    }
    .forSelection {
      height: 80px;
      width: 100%;
      border: 1px solid rgb(70, 70, 70);
      overflow: hidden;
      margin: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      cursor: pointer;
      background-image: linear-gradient(
        to top,
        #c73535,
        #a5282a,
        #831c1f,
        #641014,
        #460505
      );
      &.deselect {
        pointer-events: none;
      }
      &.pick {
        background-image: linear-gradient(
          to top,
          #2a8f38,
          #1d752c,
          #115c20,
          #064414,
          #012d07
        );
      }
      img {
        margin-left: 1rem;
        height: 130%;
        width: auto;
      }
      .text {
        padding-right: 2rem;
        h5,
        h3 {
          margin: 0;
          text-align: right;
        }
      }
      .disabled {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-color: rgba(0, 0, 0, 0.6);
      }
    }
    .forSelection-mini {
      display: none;
    }
    .expand-character-wrapper {
      display: none;
      .expander-button {
        width: 50px;
        height: 50px;
        border-radius: 100%;
        background-color: #4caf50;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        left: 25px;
        bottom: 75px;
        img {
          width: 35px;
          height: 35px;
        }
      }
      .character-list-wrapper {
        display: none;
      }
    }
    .announce-wrapper{
     display: block;
    }
    .announce-wrapper-mobile{
      display: none;
    }
    .mobile-modal{
      width: 100%;
      height: 100%;
      position: fixed;
      z-index: 100;
      top: 0;
      left: 0;
      display: none;
      background-color: rgba(32,32,32,0.7);
    }
</style>
