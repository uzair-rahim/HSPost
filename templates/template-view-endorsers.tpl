<ul class="tabs">
	<li id="tab-employees">Employees</li>
	<li id="tab-followers">Followers</li>
	<li id="tab-endorsers" class="selected">Endorsers</li>
</ul>
{{#if_true hasEndorsers}}
	<div class="page-tools">
		<button id="send-message" class="primary" disabled>Send Message</button>
		<button id="share-job" disabled>Share Job</button>
	</div>
	<ul class="grid-list"></ul>
{{else}}
	<div class="empty-page">
		Looks like You don't have any Endorsers.
	</div>
{{/if_true}}
