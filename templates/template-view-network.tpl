<div class="page-title">{{template.title}}</div>
{{#if_true hasNetwork}}
	<div class="page-tools">
		<button id="send-message" class="primary" disabled>Send Message</button>
		<button id="share-job" disabled>Share Job</button>
	</div>
{{else}}
	<div class="empty-page">
		Looks like You don't have anybody in your Network.
	</div>
{{/if_true}}