<ul class="tabs">
	<li id="tab-recent">Recent Candidates</li>
	<li id="tab-archived" class="selected">Archived Candidates</li>
</ul>
{{#if_true hasCandidates}}
	<ul class="grid-list"></ul>
{{else}}
	<div class="empty-page">
		Looks like You don't have any Archived Candidates.
	</div>
{{/if_true}}
