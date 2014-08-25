<div class="page-title">{{template.title}}</div>
{{#if_eq jobs.length 0}}
	<div class="empty-page">
		Looks like you don't have any Job Postings. Tap on the 'Add New Job Posting' button to get started.<br/>
		<button class="primary">Add New Job Posting</button>
	</div>
{{else}}
	<div class="page-tools">
		<button id="add-job" class="primary">Add New Job</button>
	</div>
	<ul class="grid-list">
		{{#each jobs}}
			<li>
				<!-- Name -->
				<div class="column job-name">{{jobName}}</div>
				<!-- Wage -->
				<div class="column job-wage">${{formatCurrency wage}} {{formatWageType wageType}}</div>
				<!-- Posted Date -->
				{{#if_eq status "POSTED"}}
					<div class="column posted">Posted: {{formatDate updated}}</div>
				{{else}}
					<div class="column posted"><span>Not Posted</span></div>
				{{/if_eq}}
				<!-- Referral Bonus -->
				{{#if_not_null referralBonus}}
					<div class="column bonus">$50.00 Referral Bonus</div>
				{{else}}
					<div class="column bonus"><span>No Referral Bonus</span></div>
				{{/if_not_null}}
				<!-- More -->
				<div class="column more"></div>
			</li>
		{{/each}}
	</ul>
{{/if_eq}}

<ul class="context-menu">
	<li>Post</li>
	<li>Unpost</li>
	<li>Edit</li>
	<li class="divider"></li>
	<li>Copy job link</li>
	<li>Share with employees</li>
	<li>Share with followes</li>
	<li class="divider"></li>
	<li>Delete</li>
</ul>