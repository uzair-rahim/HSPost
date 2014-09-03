<div class="page-title">{{template.title}}</div>
<div class="profile-row">
	<div class="row-title">{{user.firstname}} {{user.lastname}}</div>
	<div class="profile-info">
		<div class="profile-photo">
			{{#if_not_null user.photo}}
				<img src="{{user.photo.url}}"/>
			{{/if_not_null}}
		</div>
		<div class="profile-details">
			<div class="primary-work">
				<div class="position">
					{{#if_not_null user.primaryWorkHistory}}
						{{#each user.primaryWorkHistory.jobs}}
							{{jobName}} 
						{{/each}}
					{{else}}
						Not Available
					{{/if_not_null}}
				</div>
				<div class="location">
					{{#if_not_null user.primaryWorkHistory}}
						{{user.primaryWorkHistory.employer.name}}
					{{else}}
						Not Available
					{{/if_not_null}}
				</div>
			</div>
			<div class="about">
				{{#if_not_null user.about}}
					{{user.about}}
				{{else}}
					Not Available
				{{/if_not_null}}	
			</div>
		</div>
		<div class="profile-kpis">
			<div class="endorsements">
				<label>Endorsements</label>
				<div>999+</div>
			</div>
			<div class="connections">
				<label>Connections</label>
				<div>999+</div>
			</div>
			<div class="places-worked">
				<label>Places Worked</label>
				<div>{{user.placesWorkedCount}}</div>
			</div>
		</div>
	</div>
</div>
<div class="profile-row">
	<div class="row-title">Work History</div>
	<ul class="work-history-list">
		{{#if_not_null user.workHistory}}
			{{#each user.workHistory}}
				<li>
					<div class="work-history-info">
						<div class="employer-logo">
							{{#if_not_null employer.logo}}
								<img src="{{employer.logo.url}}"/>
							{{/if_not_null}}
						</div>
						<div class="employment-details">
							<div class="position">Drive-Through</div>
							<div class="location">{{employer.name}}</div>
							<div class="dates">{{startDate}} - {{endDate}}</div>
						</div>
					</div>
				</li>
			{{/each}}
		{{else}}
			<li>
				<div class="empty">{{user.firstname}} has no work history</div>
			</li>
		{{/if_not_null}}
	</ul>
</div>