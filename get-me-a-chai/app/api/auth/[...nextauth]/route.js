import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import User from "@/models/User";
import connectDB from "@/db/dbConnect";

export const authOptions = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider === "github") {
        // connect to the db
        await connectDB()
        

        // find the user in the db
        let existingUser = await User.findOne({ email: email });

        // if user does not exist, create a new user
        if (!existingUser) {
          const newUser = await new User({
            email: user.email,
            username: user.email.split("@")[0],
            // to_username: email.split("@")[0], // Ensure to_username is populated
          });
          await newUser.save();
          user.name = newUser.username;
        } 
        return true;
      }
    },

    async session({ session, user, token }) {
      const dbUser = await User.findOne({ email: session.user.email });
      
      session.user.name = dbUser.username;
      return session;
    },
  },
});

export { authOptions as GET, authOptions as POST };