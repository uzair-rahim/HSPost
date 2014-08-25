<div class="page-title">{{template.title}}</div>
{{#if_true hasCandidates}}
	<div class="page-tools">
		<button id="send-message" class="primary" disabled>Send Message</button>
		<button id="archive-candidates" disabled>Archive Candidates</button>
	</div>
	{{#each jobs}}
		<div class="grid-list-title">{{jobName}}</div>
		<ul class="grid-list">
			{{#if_eq candidates.length 0}}
				<li>
					<div class="column empty-list">No candidates for {{../jobName}} job</div>
				</li>
			{{else}}
				{{#each candidates}}
					<li class="tall">
						<input type="checkbox" class="user-select"/>
						<!-- Profile Picture -->
						<div class="column user-picture">
							{{#if_not_null user.photo}}
								<img src="{{user.photo.url}}"/>
							{{/if_not_null}}
						</div>
						<!-- User Info -->
						<div class="column user-info">
							<div class="name">{{user.firstname}} {{user.lastname}}</div>
							<div class="job">
								{{#if_not_null user.primaryWorkHistory}}
									{{#each user.primaryWorkHistory.jobs}}
										{{jobName}} 
									{{/each}} @ 
									{{user.primaryWorkHistory.employer.name}}
								{{else}}
									Not Available
								{{/if_not_null}}
							</div>
						</div>
						<!-- More -->
						<div class="column more"></div>
					</li>
				{{/each}}
			{{/if_eq}}
		</ul>
	{{/each}}
{{else}}
	<div class="empty-page">
		Looks like you don't have any Candidates.
	</div>
{{/if_true}}
