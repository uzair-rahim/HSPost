<ul class="tabs">
	<li id="tab-recent" class="selected">Recent Candidates</li>
	<li id="tab-archived">Archived Candidates</li>
</ul>
{{#if_true hasCandidates}}
	<div class="page-tools">
		<button id="send-message" class="primary" disabled>Send Message</button>
		<button id="archive-candidates" disabled>Archive Candidates</button>
	</div>
	<ul class="grid-list"></ul>
{{else}}
	<div class="empty-page">
		Looks like You don't have any Candidates.
	</div>
{{/if_true}}
