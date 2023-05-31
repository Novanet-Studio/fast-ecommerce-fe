export default function useAppAuth() {
  const token = useStrapiToken();
  const { setToken, setUser } = useStrapiAuth();
  const authStore = useAuthStore();

  onMounted(() => {
    if (token.value) return;
    if (!authStore.token) return;

    setToken(authStore.token);
    setUser({
      ...authStore.user,
      id: authStore.user.id,
    });
  });
}
