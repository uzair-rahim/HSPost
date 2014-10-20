<ul class="tabs">
	<li id="tab-endorsements">Endorsements</li>
	<li id="tab-people" class="selected">People</li>
	<li id="tab-places">Places</li>
</ul>
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