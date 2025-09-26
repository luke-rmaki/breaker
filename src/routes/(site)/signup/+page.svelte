<script lang="ts">
	import { auth_client } from '$lib/auth/auth-client';

	async function signup(e: Event) {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const form_data = new FormData(form);

		//  casting as inputs are listed as required in the form
		const email = form_data.get('email') as string;
		const name = form_data.get('name') as string;
		const password = form_data.get('password') as string;

		console.log('Form submitted:', { email, password });
		const { data, error } = await auth_client.signUp.email(
			{
				email, // user email address
				password, // user password -> min 8 characters by default
				name, // user display name
				callbackURL: `${window.location.origin}/login` // redirect user to this URL after they confirm their email address
			},
			{
				onRequest: (ctx) => {
					console.log('loading');
				},
				onSuccess: (ctx) => {
					alert('Success! Please check your email for a confirmation link.');
					auth_client.sendVerificationEmail({ email });
				},
				onError: (ctx) => {
					// display the error message
					alert(ctx.error.message);
				}
			}
		);
	}
</script>

<title>Breaker | Sign Up</title>

<h1>Sign Up</h1>

<form onsubmit={signup}>
	<label for="username">Display Name</label>
	<input type="text" id="username" name="name" required />

	<label for="email">Email:</label>
	<input type="email" id="email" name="email" required />

	<label for="password">Password:</label>
	<input type="password" id="password" name="password" required min="8" />

	<button type="submit">Sign Up</button>
</form>
