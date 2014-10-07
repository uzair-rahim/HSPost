<ul class="tabs">
	<li id="tab-endorsements" class="selected">Endorsements</li>
	<li id="tab-people">People</li>
	<li id="tab-places">Places</li>
</ul>
<!-- My Ednorsements -->
<div id="panel-endorsements" class="panel show">
	{{#if_true hasEndorsements}}
		<div class="grid-list-title">My Endorsements</div>
		<ul class="grid-list"></ul>
	{{else}}
		<div class="empty-page">
			Looks like You don't have any Endorsements.
		</div>
	{{/if_true}}
</div>
<div id="panel-people" class="panel">
	{{#if_true hasAnyConnections}}
		<!-- Received Requests -->
		{{#if_true hasReceivedRequests}}
			<div class="grid-list-title">Received Requests</div>
			<ul id="received" class="grid-list"></ul>	
		{{/if_true}}
		<!-- Sent Requests -->
		{{#if_true hasSentRequests}}
			<div class="grid-list-title">Sent Requests</div>
			<ul id="sent" class="grid-list"></ul>	
		{{/if_true}}
		<!-- Connections -->
		{{#if_true hasConnections}}
			<div class="grid-list-title">My Connections</div>
			<ul id="connections" class="grid-list"></ul>	
		{{/if_true}}
	{{else}}
		<div class="empty-page">
			Looks like You don't have any Connections.
		</div>
	{{/if_true}}
</div>
<div id="panel-places" class="panel">
	{{#if_true hasPlaces}}
		<div class="grid-list-title">Following</div>
		<ul class="grid-list"></ul>
	{{else}}
		<div class="empty-page">
			Looks like You're not following any Stores.
		</div>
	{{/if_true}}
</div>