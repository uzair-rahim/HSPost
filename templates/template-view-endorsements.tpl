<ul class="tabs">
	<li id="tab-endorsements" class="selected">Endorsements</li>
	<li id="tab-people">People</li>
	<li id="tab-places">Places</li>
</ul>
{{#if_true hasEndorsements}}
	<div class="grid-list-title">My Endorsements</div>
	<ul class="grid-list"></ul>
{{else}}
	<div class="empty-page">
		Looks like You don't have any Endorsements.
	</div>
{{/if_true}}