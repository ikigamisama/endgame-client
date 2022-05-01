<template>
  <div class="center">
    <el-card>
      <h3>Paimon Sandwich Endgame Banning and Picking System</h3>
      <el-form v-if="!$route.params.id" ref="gmForm" :model="form" :rules="rules">
        <el-form-item>
          <img v-if="avatar" :src="avatar">
        </el-form-item>
        <el-form-item prop="name">
          <el-input v-model="form.name" placeholder="GM Name"></el-input>
        </el-form-item>
        <el-form-item prop="key">
          <el-input v-model="gmForm.key" type="password" placeholder="Secret Key"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="createRoom('gmForm')">Create Private Room</el-button>
        </el-form-item>
      </el-form>
      <el-form v-else ref="form" :model="form" :rules="rules">
        <el-form-item>
          <img v-if="avatar" :src="avatar">
        </el-form-item>
        <el-form-item prop="name">
          <el-input v-model="form.name" placeholder="Player Name/Team Name" @change="createAvatar"></el-input>
        </el-form-item>
        <el-form-item prop="avatar">
          <el-select v-model="form.avatar" placeholder="Select Avatar" @change="createAvatar">
            <el-option
              v-for="item in sprints"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :selected="item.value === 'male'">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="joinRoom('form')">Join Room</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      sprints: [
        {
          label: 'Male',
          value: 'male'
        },
        {
          label: 'Female',
          value: 'female'
        },
        {
          label: 'Human',
          value: 'human'
        },
        {
          label: 'Identicon',
          value: 'identicon'
        },
        {
          label: 'Initials',
          value: 'initials'
        },
        {
          label: 'Bottts',
          value: 'bottts'
        },
        {
          label: 'Avataaars',
          value: 'avataaars'
        },
        {
          label: 'Jdenticon',
          value: 'jdenticon'
        },
        {
          label: 'Gridy',
          value: 'gridy'
        },
        {
          label: 'Micah',
          value: 'micah'
        }
      ],
      avatar: null,
      form: {
        name: null,
        avatar: null
      },
      gmForm: {
        name: null,
        key: null
      },
      gmRules: {
        key: [
          { required: true }
        ]
      },
      rules: {
        name: [
          { required: true }
        ],
        avatar: [
          { required: true }
        ]
      }
    }
  },
  created () {
    if (!this.$route.params.id) {
      localStorage.setItem('hostData', JSON.stringify({}))
    } else {
      localStorage.setItem('userData', JSON.stringify({}))
    }
  },
  methods: {
    createAvatar () {
      if (this.form.name && this.form.avatar) {
        this.avatar = `https://avatars.dicebear.com/api/${this.form.avatar}/:${this.form.name}.svg`
      }
    },
    createRoom (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$socket.client.emit('createRoom', this.gmForm)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    joinRoom (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          const form = {
            name: this.form.name,
            avatar: this.avatar
          }

          localStorage.setItem('userData', JSON.stringify({ ...form, room: this.$route.params.id }))
          this.$socket.client.emit('joinRoom', form, this.$route.params.id)
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
    createRoomId (val) {
      localStorage.setItem('hostData', JSON.stringify(val))
      this.$router.push(`/room/${val.room}`)
    },
    getRoomId (val) {
      this.$router.push(`/room/${val}`)
    },
    incorrectKey () {
      this.$message({
        message: 'Invalid Key',
        type: 'error'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
 @media screen and (max-width: 480px) {
   .center {
      padding: 0 22px;
  }
   h3 {
    width: 100% !important;
  }
 }
  .center {
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  h3 {
    width: 400px;
    text-align: center;
  }
  img {
    height: 100px;
    display: block;
    margin: 0 auto;
  }
  .el-select {
    width: 100%;
  }
  .el-button {
    width: 100%;
  }
</style>
