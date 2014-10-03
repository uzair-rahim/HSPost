<div class="page-title">{{template.title}}</div>
{{#if_true hasCandidates}}
	<div class="page-tools">
		<button id="send-message" class="primary" disabled>Send Message</button>
		<button id="archive-candidates" disabled>Archive Candidates</button>
	</div>
{{else}}
	<div class="empty-page">
		Looks like You don't have any Candidates.
	</div>
{{/if_true}}
