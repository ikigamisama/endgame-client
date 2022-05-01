<template>
  <div class="container">
    <el-row>
      <el-col v-if="isHost">
        <el-card>
          <div slot="header">
            <span>Game Setup</span>
          </div>
          <el-form ref="form" :model="form" :rules="rules">
            <el-form-item prop="mode" label="Mode">
              <el-radio-group v-model="form.mode">
                <el-radio-button label="1v1">1v1</el-radio-button>
                <el-radio-button label="2v2">2v2</el-radio-button>
                <el-radio-button label="3v3">3v3</el-radio-button>
                <el-radio-button label="4v4">4v4</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="Players">
              <div v-if="captains.length">
                <div v-for="(player, index) in captains" :key="index" class="player" @click="removeCaptain(player)">
                  <img :src="player.avatar" alt="">
                  <p>{{player.username}}</p>
                </div>
              </div>
            </el-form-item>
            <el-form-item prop="firstPick" label="First Pick">
              <div v-if="captains.length">
                <el-radio-group v-for="(player, index) in captains" :key="index" v-model="form.firstPick">
                  <el-radio-button :label="index">{{ player.username }}</el-radio-button>
                </el-radio-group>
              </div>
            </el-form-item>
            <el-form-item label="Invite Link">
              <el-input v-model="link" readonly></el-input>
            </el-form-item>
            <el-form-item class="buttons">
              <div class="btn-group">
                <el-button type="primary" @click="start('form')">Start Game</el-button>
              </div>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col>
        <el-card>
          <div slot="header">
            <span>Players</span>
          </div>
          <div v-for="(player, index) in players" :key="index" class="player" @click="selectCaptain(player)">
            <img :src="player.avatar" alt="">
            <p>{{player.username}}</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      players: [],
      captains: [],
      isHost: false,
      userId: null,
      link: window.location.origin + '/' + this.$route.params.id,
      form: {
        room: this.$route.params.id,
        mode: null,
        firstPick: null
      },
      rules: {
        mode: [
          { required: true }
        ],
        firstPick: [
          { required: true }
        ]
      }
    }
  },
  created () {
    if (localStorage.getItem('userData')) {
      const userData = JSON.parse(localStorage.getItem('userData'))
      this.$socket.client.emit('joinRoom', userData, userData.room)
    } else {
      this.$socket.client.emit('getUser')
    }

    if (localStorage.getItem('hostData')) {
      const hostData = JSON.parse(localStorage.getItem('hostData'))
      this.$socket.client.emit('joinRoom', hostData, hostData.room)
    } else {
      this.$socket.client.emit('getUser')
    }

    // this.$socket.client.emit('reconnecting', 'reconnecting')
    this.$socket.client.emit('getAllPlayersInRoom', this.$route.params.id)
  },
  methods: {
    selectCaptain (player) {
      if (this.isHost) {
        const existingCaptain = this.captains.find(captain => captain.id === player.id)
        if (existingCaptain) {
          this.$message({
            message: 'Captain already selected',
            type: 'error'
          })
        } else if (this.captains.length < 2) {
          this.$confirm(`Select ${player.username} for the game?`, 'Select Player', {
            confirmButtonText: 'Yes',
            cancelButtonText: 'Cancel',
            type: 'info'
          }).then(() => {
            this.captains.push(player)
          })
        } else {
          this.$message({
            message: 'Maximum number of captains reached',
            type: 'error'
          })
        }
      }
    },
    removeCaptain (player) {
      this.$confirm(`Remove ${player.username} for the game?`, 'Remove Player', {
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel',
        type: 'info'
      }).then(() => {
        this.captains = this.captains.filter(captain => captain.id !== player.id)
        this.form.firstPick = null
      })
    },
    start (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.form.captains = this.captains
          this.form.host = this.userId
          this.$socket.client.emit('startPhase', this.form)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  sockets: {
    connect () {
      console.log('socket connected')
    },
    getAllPlayersInRoom (val) {
      this.players = val
    },
    reconnectingClient (data) {
      console.log(data)
    },
    getUser (val) {
      this.userId = val.id
      this.isHost = val.isHost
      if (this.isHost) {
        this.$socket.client.emit('reset', { room: this.$route.params.id, type: 1 })
      }
    },
    startPhase (mode) {
      this.$router.push(`phase/${this.$route.params.id}?userId=${this.userId}&isHost=${this.isHost}&mode=${mode}`)
    }
  }
}
</script>

<style lang="scss" scoped>
    @media screen and (min-width: 1281px) {
       .container{
         max-width: 65em;
       }
     }
    @media screen and (min-width: 1025px) and (max-width: 1280px) {
       .container{
         max-width: 65em;
       }
     }
     @media screen and (min-width: 768px) and (max-width: 1024px)  {
       .container{
          max-width: 55em;
       }
     }
     @media screen and  (min-width: 480px) and (max-width: 768px)  {
       .container{
          max-width: 45em;
       }
     }
     @media screen and (max-width: 480px) {
       .container{
          width: 100%;
          .el-row{
            flex-direction: column !important;
            .el-col{
              width: 100% !important;
              padding: 0 17px;
              margin-bottom: 15px;
            }
          }
        }
     }

 .container {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      margin: 0 auto;
      .el-row {
        width: 100%;
        display: flex;
        justify-content: center;
        flex-direction: row;
        .el-col {
          padding: 0 10px;
          // max-width: 500px;
          width: 50%;
          span {
            font-weight: bold;
          }
          img {
            width: 50px;
            display: block;
            margin: 0 auto;
          }
          p {
            text-align: center;
          }
          .btn-group {
            display: flex;
            justify-content: space-between;
          }
          .player {
            display: inline-block;
            width: 25%;
            margin: 0;
            cursor: pointer;
          }
        }
      }
    }
</style>
