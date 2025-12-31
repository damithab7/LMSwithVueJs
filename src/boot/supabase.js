import { createClient } from '@supabase/supabase-js'
import { boot } from 'quasar/wrappers'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseAnonKey)

export default boot(({ app }) => {
  // Make supabase available via this.$supabase in Options API
  app.config.globalProperties.$supabase = supabase
  // Make supabase available via inject('supabase')
  app.provide('supabase', supabase)
})

export { supabase }
