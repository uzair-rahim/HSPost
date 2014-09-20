<ul class="tabs">
	<li id="tab-endorsements" class="selected">Endorsements</li>
	<li id="tab-people">People</li>
	<li id="tab-places">Places</li>
</ul>
<div id="panel-endorsements" class="panel show">
	{{#if_true hasEndorsements}}
		<ul class="grid-list">
			{{#each endorsements}}
				<li class="tall" data-guid="{{guid}}">
					<!-- Profile Picture -->
					<div class="column user-picture">
						{{#if_not_null photo}}
							<img src="{{photo.url}}"/>
						{{/if_not_null}}
					</div>
					<!-- User Info -->
					<div class="column user-info">
						<div class="name">{{firstname}} {{lastname}}</div>
						<div class="job">
							{{#if_not_null primaryWorkHistory}}
								{{#each primaryWorkHistory.jobs}}
									{{jobName}} 
								{{/each}} @ 
							{{primaryWorkHistory.employer.name}}
							{{else}}
								Not Available
							{{/if_not_null}}
						</div>
					</div>
					<!-- More -->
					<div class="column more"></div>
				</li>
			{{/each}}
		</ul>
	{{else}}
		<div class="empty-page">
			Looks like You don't have any Endorsements.
		</div>
	{{/if_true}}
</div>
<div id="panel-people" class="panel">
	<!-- Received Requests -->
	{{#if_true hasReceived}}
		<div class="grid-list-title">Pending Connections Requests</div>
		<ul class="grid-list">
			{{#each received}}
				<li class="tall" data-guid="{{guid}}">
					<!-- Profile Picture -->
					<div class="column user-picture">
						{{#if_not_null photo}}
							<img src="{{photo.url}}"/>
						{{/if_not_null}}
					</div>
					<!-- User Info -->
					<div class="column user-info">
						<div class="name">{{firstname}} {{lastname}}</div>
						<div class="job">
							{{#if_not_null primaryWorkHistory}}
								{{#each primaryWorkHistory.jobs}}
									{{jobName}} 
								{{/each}} @ 
							{{primaryWorkHistory.employer.name}}
							{{else}}
								Not Available
							{{/if_not_null}}
						</div>
					</div>
					<!-- More -->
					<div class="column more"></div>
				</li>
			{{/each}}
		</ul>	
	{{/if_true}}
	<!-- Sent Requests -->
	{{#if_true hasSent}}
		<ul class="grid-list">
			{{#each received}}
				<li class="tall" data-guid="{{guid}}">
					<!-- Profile Picture -->
					<div class="column user-picture">
						{{#if_not_null photo}}
							<img src="{{photo.url}}"/>
						{{/if_not_null}}
					</div>
					<!-- User Info -->
					<div class="column user-info">
						<div class="name">{{firstname}} {{lastname}}</div>
						<div class="job">
							{{#if_not_null primaryWorkHistory}}
								{{#each primaryWorkHistory.jobs}}
									{{jobName}} 
								{{/each}} @ 
							{{primaryWorkHistory.employer.name}}
							{{else}}
								Not Available
							{{/if_not_null}}
						</div>
					</div>
					<!-- More -->
					<div class="column more"></div>
				</li>
			{{/each}}
		</ul>	
	{{/if_true}}
	<!-- Connections -->
	{{#if_true hasConnections}}
		<div class="grid-list-title">My Connections</div>
		<ul class="grid-list">
			{{#each connections}}
				<li class="tall" data-guid="{{guid}}">
					<!-- Profile Picture -->
					<div class="column user-picture">
						{{#if_not_null photo}}
							<img src="{{photo.url}}"/>
						{{/if_not_null}}
					</div>
					<!-- User Info -->
					<div class="column user-info">
						<div class="name">{{firstname}} {{lastname}}</div>
						<div class="job">
							{{#if_not_null primaryWorkHistory}}
								{{#each primaryWorkHistory.jobs}}
									{{jobName}} 
								{{/each}} @ 
							{{primaryWorkHistory.employer.name}}
							{{else}}
								Not Available
							{{/if_not_null}}
						</div>
					</div>
					<!-- More -->
					<div class="column more"></div>
				</li>
			{{/each}}
		</ul>	
	{{else}}
		<div class="empty-page">
			Looks like You don't have any Connections.
		</div>
	{{/if_true}}
</div>
<div id="panel-places" class="panel">
	{{#if_true hasPlaces}}
		<ul class="grid-list">
			{{#each places}}
				<li class="tall" data-guid="{{guid}}">
					<!-- Employer Logo -->
					<div class="column employer-logo">
						{{#if_not_null logo}}
							<img src="{{logo.url}}"/>
						{{/if_not_null}}
					</div>
					<!-- Employer Info -->
					<div class="column employer-info">
						<div class="name">{{name}}</div>
						<div class="location">
							{{#if_not_null location}}
								{{location.address1}}
							{{else}}
								Location not available
							{{/if_not_null}}
						</div>
					</div>
					<!-- More -->
					<div class="column more"></div>
				</li>
			{{/each}}
		</ul>
	{{else}}
		<div class="empty-page">
			Looks like You're not following any Stores.
		</div>
	{{/if_true}}
</div>