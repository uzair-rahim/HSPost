<div class="page-title">{{template.title}}</div>
{{#ifEmployerHasNoNetwork this}}
	<div class="empty-page">
		Looks like you don't have anybody in your network.
	</div>
{{else}}
	<div class="page-tools">
		<button id="send-message" class="primary" disabled>Send Message</button>
		<button id="share-job" disabled>Share Job</button>
	</div>
	<!-- Employees -->
	{{#if_not_eq employees.length 0}}
		<div class="grid-list-title">Employees ({{employees.length}})</div>
		<ul class="grid-list">
			{{#each employees}}
				<li class="tall">
					<input type="checkbox" class="user-select"/>
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
	{{/if_not_eq}}
	<!-- Followers -->
	{{#if_not_eq followers.length 0}}
		<div class="grid-list-title">Followers ({{followers.length}})</div>
		<ul class="grid-list">
			{{#each followers}}
				<li class="tall">
					<input type="checkbox" class="user-select"/>
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
	{{/if_not_eq}}
	<!-- Endorsers -->
	{{#if_not_eq endorsers.length 0}}
		<div class="grid-list-title">Endorsers ({{endorsers.length}})</div>
		<ul class="grid-list">
			{{#each endorsers}}
				<li class="tall">
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
	{{/if_not_eq}}
{{/ifEmployerHasNoNetwork}}