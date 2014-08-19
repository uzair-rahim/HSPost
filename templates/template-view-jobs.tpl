<div class="page-title">{{template.title}}</div>
<div class="page-tools"></div>
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