<template>
  <q-page class="q-pa-md">
    <div class="row items-center justify-between q-mb-lg">
      <div class="text-h5 text-weight-bold">Users Management</div>
      <q-btn
        label="Add User"
        color="black"
        class="neo-btn"
        no-caps
        icon="add"
        @click="openAddUserDialog"
      />
    </div>

    <q-card class="glass-card">
      <q-table
        :rows="users"
        :columns="columns"
        row-key="id"
        :loading="loading"
        flat
        :bordered="false"
        class="bg-transparent"
        card-class="bg-transparent text-inherit"
        table-class="text-inherit"
        table-header-class="text-grey-7 text-uppercase letter-spacing-2"
        :pagination="{ rowsPerPage: 10 }"
      >
        <template v-slot:body-cell-display_name="props">
          <q-td :props="props">
            <div class="row items-center no-wrap">
              <q-avatar size="32px" class="q-mr-md" :style="getAvatarStyle(props.row.display_name)">
                <span class="text-subtitle2 text-white">{{
                  props.row.display_name?.charAt(0).toUpperCase()
                }}</span>
              </q-avatar>
              <div class="text-weight-medium">{{ props.row.display_name }}</div>
            </div>
          </q-td>
        </template>

        <template v-slot:body-cell-role="props">
          <q-td :props="props">
            <q-badge
              :color="getRoleColor(props.value)"
              class="q-py-xs q-px-sm text-weight-bold letter-spacing-1"
              rounded
              text-color="white"
            >
              {{ props.value }}
            </q-badge>
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props" class="q-gutter-sm">
            <q-btn
              flat
              round
              dense
              icon="edit"
              size="sm"
              color="primary"
              @click="openEditUserDialog(props.row)"
            />
            <q-btn
              flat
              round
              dense
              icon="delete"
              size="sm"
              color="grey-6"
              class="hover-red"
              @click="confirmDelete(props.row)"
            />
          </q-td>
        </template>
      </q-table>
    </q-card>

    <!-- Add User Dialog -->
    <q-dialog v-model="addUserOpen">
      <q-card style="min-width: 400px" class="glass-card q-pa-sm">
        <q-card-section>
          <div class="text-h6">Add New User</div>
        </q-card-section>

        <q-card-section class="q-gutter-y-md">
          <q-input
            v-model="newUser.email"
            label="Email"
            outlined
            dense
            autofocus
            :dark="$q.dark.isActive"
            :label-color="$q.dark.isActive ? 'grey-3' : 'grey-7'"
            :input-class="$q.dark.isActive ? 'text-white' : 'text-black'"
          />
          <q-input
            v-model="newUser.display_name"
            label="Display Name"
            outlined
            dense
            :dark="$q.dark.isActive"
            :label-color="$q.dark.isActive ? 'grey-3' : 'grey-7'"
            :input-class="$q.dark.isActive ? 'text-white' : 'text-black'"
          />

          <q-input
            v-model="newUser.password"
            label="Password"
            outlined
            dense
            :dark="$q.dark.isActive"
            :label-color="$q.dark.isActive ? 'grey-3' : 'grey-7'"
            :input-class="$q.dark.isActive ? 'text-white' : 'text-black'"
          >
            <template v-slot:append>
              <q-btn
                round
                dense
                flat
                icon="refresh"
                @click="generatePassword"
                :color="$q.dark.isActive ? 'grey-4' : 'grey-7'"
              />
            </template>
          </q-input>

          <q-select
            v-model="newUser.role"
            :options="roleOptions"
            label="Role"
            outlined
            dense
            emit-value
            map-options
            :dark="$q.dark.isActive"
            :label-color="$q.dark.isActive ? 'grey-3' : 'grey-7'"
            :popup-content-class="$q.dark.isActive ? 'bg-grey-9 text-white' : ''"
          />
        </q-card-section>

        <q-card-actions align="right" class="q-pt-md">
          <q-btn
            flat
            label="Cancel"
            v-close-popup
            :color="$q.dark.isActive ? 'grey-5' : 'grey-7'"
          />
          <q-btn
            unelevated
            label="Create User"
            @click="addUser"
            :loading="addingUser"
            color="primary"
            class="text-weight-bold"
            :class="$q.dark.isActive ? 'text-white' : ''"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Edit User Dialog -->
    <q-dialog v-model="editUserOpen">
      <q-card style="min-width: 400px" class="glass-card q-pa-sm">
        <q-card-section>
          <div class="text-h6">Edit User</div>
        </q-card-section>

        <q-card-section class="q-gutter-y-md">
          <q-input
            v-model="editUserData.email"
            label="Email"
            outlined
            dense
            readonly
            disable
            :dark="$q.dark.isActive"
            :label-color="$q.dark.isActive ? 'grey-5' : 'grey-7'"
            :input-class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-7'"
            hint="Email cannot be changed"
          />
          <q-input
            v-model="editUserData.display_name"
            label="Display Name"
            outlined
            dense
            :dark="$q.dark.isActive"
            :label-color="$q.dark.isActive ? 'grey-3' : 'grey-7'"
            :input-class="$q.dark.isActive ? 'text-white' : 'text-black'"
          />
          <q-select
            v-model="editUserData.role"
            :options="roleOptions"
            label="Role"
            outlined
            dense
            emit-value
            map-options
            :dark="$q.dark.isActive"
            :label-color="$q.dark.isActive ? 'grey-3' : 'grey-7'"
            :popup-content-class="$q.dark.isActive ? 'bg-grey-9 text-white' : ''"
          />
        </q-card-section>

        <q-card-actions align="right" class="q-pt-md">
          <q-btn
            flat
            label="Cancel"
            v-close-popup
            :color="$q.dark.isActive ? 'grey-5' : 'grey-7'"
          />
          <q-btn
            unelevated
            label="Save Changes"
            @click="saveEditUser"
            :loading="editingUser"
            color="primary"
            class="text-weight-bold"
            :class="$q.dark.isActive ? 'text-white' : ''"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, onMounted, inject, computed } from 'vue'

const supabase = inject('supabase')
const searchQuery = inject('searchQuery')
const loading = ref(true)
const allUsers = ref([])

const users = computed(() => {
  if (!searchQuery?.value) return allUsers.value
  const query = searchQuery.value.toLowerCase()
  return allUsers.value.filter(
    (u) => u.email?.toLowerCase().includes(query) || u.display_name?.toLowerCase().includes(query),
  )
})

const columns = [
  { name: 'email', label: 'Email', field: 'email', align: 'left', sortable: true },
  { name: 'display_name', label: 'Name', field: 'display_name', align: 'left', sortable: true },
  { name: 'role', label: 'Role', field: 'role', align: 'left', sortable: true },
  {
    name: 'created_at',
    label: 'Joined',
    field: 'created_at',
    align: 'left',
    format: (val) => new Date(val).toLocaleDateString(),
  },
  { name: 'actions', label: 'Actions', field: 'actions', align: 'center' },
]

function getRoleColor(role) {
  const isDark = $q.dark.isActive
  switch (role) {
    case 'admin':
      return isDark ? 'purple-5' : 'purple-6'
    case 'teacher':
      return isDark ? 'orange-5' : 'orange-8'
    default:
      return isDark ? 'green-5' : 'green-7'
  }
}

function getAvatarStyle(name) {
  const colors = ['#7e57c2', '#ef5350', '#42a5f5', '#26a69a', '#ffca28', '#8d6e63']
  const index = name ? name.charCodeAt(0) % colors.length : 0
  return { backgroundColor: colors[index] }
}

async function fetchUsers() {
  loading.value = true
  // Mock data fallback if DB is empty or connection fails for now
  try {
    const { data, error } = await supabase.from('profiles').select('*')
    if (error) throw error
    if (data && data.length > 0) {
      allUsers.value = data
    } else {
      // Fallback or empty
      allUsers.value = []
    }
  } catch (err) {
    console.error('Error fetching users:', err)
    // Mock data for display purposes if DB is empty
    allUsers.value = [
      {
        id: 1,
        email: 'admin@classmaster.com',
        display_name: 'Admin User',
        role: 'admin',
        created_at: new Date(),
      },
      {
        id: 2,
        email: 'student@test.com',
        display_name: 'Jane Doe',
        role: 'student',
        created_at: new Date(),
      },
    ]
  } finally {
    loading.value = false
  }
}

import { useQuasar } from 'quasar'

const $q = useQuasar()

// Add User State
const addUserOpen = ref(false)
const addingUser = ref(false)
const newUser = ref({
  email: '',
  password: '',
  display_name: '',
  role: 'student',
})

const roleOptions = [
  { label: 'Student', value: 'student' },
  { label: 'Teacher', value: 'teacher' },
  { label: 'Admin', value: 'admin' },
]

function openAddUserDialog() {
  newUser.value = { email: '', password: '', display_name: '', role: 'student' }
  addUserOpen.value = true
}

function generatePassword() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%'
  let pass = ''
  for (let i = 0; i < 12; i++) {
    pass += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  newUser.value.password = pass
}

async function addUser() {
  if (!newUser.value.email || !newUser.value.password) {
    $q.notify({ type: 'negative', message: 'Email and Password are required' })
    return
  }

  addingUser.value = true
  try {
    const { data, error } = await supabase.auth.signUp({
      email: newUser.value.email,
      password: newUser.value.password,
      options: {
        data: {
          display_name: newUser.value.display_name || newUser.value.email.split('@')[0],
        },
      },
    })

    if (error) throw error

    // Note: For a real app, this should be done via Edge Function to avoid session switching
    if (data.user) {
      const { error: roleError } = await supabase
        .from('profiles')
        .update({ role: newUser.value.role })
        .eq('id', data.user.id)
      if (roleError) {
        console.warn('Could not set role:', roleError)
      } else {
        $q.notify({ type: 'positive', message: 'User created with role ' + newUser.value.role })
      }
    }

    addUserOpen.value = false
    fetchUsers()
  } catch (err) {
    $q.notify({ type: 'negative', message: err.message })
  } finally {
    addingUser.value = false
  }
}

function confirmDelete(user) {
  $q.dialog({
    title: 'Confirm Deletion',
    message: `Are you sure you want to delete ${user.display_name || user.email}? This cannot be undone.`,
    cancel: true,
    persistent: true,
    ok: {
      label: 'Delete',
      color: 'negative',
    },
  }).onOk(async () => {
    try {
      const { error } = await supabase.from('profiles').delete().eq('id', user.id)
      if (error) throw error

      allUsers.value = allUsers.value.filter((u) => u.id !== user.id)
      $q.notify({
        color: 'positive',
        message: 'User deleted',
      })
    } catch (err) {
      console.error('Error deleting user:', err)
      $q.notify({
        color: 'negative',
        message: 'Delete failed: ' + err.message,
      })
    }
  })
}

onMounted(() => {
  fetchUsers()
})

// Edit User State
const editUserOpen = ref(false)
const editingUser = ref(false)
const editUserData = ref({
  id: '',
  email: '',
  display_name: '',
  role: 'student',
})

function openEditUserDialog(user) {
  editUserData.value = {
    id: user.id,
    email: user.email,
    display_name: user.display_name,
    role: user.role,
  }
  editUserOpen.value = true
}

async function saveEditUser() {
  editingUser.value = true
  try {
    const { error } = await supabase
      .from('profiles')
      .update({
        display_name: editUserData.value.display_name,
        role: editUserData.value.role,
      })
      .eq('id', editUserData.value.id)

    if (error) throw error

    const u = allUsers.value.find((u) => u.id === editUserData.value.id)
    if (u) {
      u.display_name = editUserData.value.display_name
      u.role = editUserData.value.role
    }

    $q.notify({ type: 'positive', message: 'User updated successfully' })
    editUserOpen.value = false
  } catch (err) {
    $q.notify({ type: 'negative', message: 'Update failed: ' + err.message })
  } finally {
    editingUser.value = false
  }
}
</script>

<style scoped>
.glass-card {
  border: 1px solid rgba(128, 128, 128, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 12px; /* Smoother corners */
}
.body--dark .glass-card {
  background: #151515; /* Slightly lighter than pure black */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
}
.body--light .glass-card {
  background: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  border: 1px solid rgba(0, 0, 0, 0.05);
}
.hover-red:hover {
  color: #f44336 !important; /* Red on hover only */
  background: rgba(244, 67, 54, 0.1);
}

/* Reusing neo-btn */
.neo-btn {
  background: white !important;
  color: black !important;
  border: 2px solid black !important;
  box-shadow: 2px 2px 0 black;
  text-transform: uppercase;
  font-weight: 700;
  border-radius: 4px;
}
.neo-btn:active {
  box-shadow: 0 0 0 black;
  transform: translate(2px, 2px);
}
.letter-spacing-2 {
  letter-spacing: 1px;
  font-size: 0.75rem;
  font-weight: 600;
}
</style>
