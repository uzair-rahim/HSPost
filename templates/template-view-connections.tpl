<div class="page-title">{{template.title}}</div>
{{#if_true hasConnections}}
	<div class="grid-list-title">{{jobName}}</div>
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
		Looks like you don't have any Connections.
	</div>
{{/if_true}}