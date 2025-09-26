<script lang="ts">
	import { auth_client } from '$lib/auth/auth-client';

	function login(e: Event) {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		const form_data = new FormData(form);

		// casting as inputs are listed as required in the form
		const email = form_data.get('email') as string;
		const password = form_data.get('password') as string;

		auth_client.signIn.email(
			{
				email, // user email address
				password, // user password
				callbackURL: `${window.location.origin}/breaker`
			},
			{
				onRequest: (ctx) => {
					console.log('loading');
				},
				onSuccess: (ctx) => {
					console.log('success', ctx);
					// window.location.href = ctx.session ? ctx.session.user?.user_metadata?.full_name ? '/dashboard' : '/onboarding' : '/';
				},
				onError: (ctx) => {
					// display the error message
					alert(ctx.error.message);
				}
			}
		);
	}
</script>

<title>Breaker | Log In</title>

<h1>Log In</h1>

<form onsubmit={login}>
	<label for="email">Email:</label>
	<input type="email" id="email" name="email" required />

	<label for="password">Password:</label>
	<input type="password" id="password" name="password" required />

	<button type="submit">Log In</button>
</form>
