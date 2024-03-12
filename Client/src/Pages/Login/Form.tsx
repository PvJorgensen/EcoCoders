// const loginWithMagicLink = async (email) => {
//     setLoading(true);
//     try {
//       const { error } = await supabase.auth.signIn({ email });
//       if (error) {
//         throw error;
//       }
//       alert("check your email for the magic link");
//     } catch (error) {
//       alert(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };