<!-- Name -->
<div class="column job-name">{{job.jobName}}</div>
<!-- Wage -->
<div class="column job-wage">${{formatCurrency job.wage}} {{formatWageType job.wageType}}</div>
<!-- Posted Date -->
{{#if_eq job.status "POSTED"}}
	<div class="column posted">Posted: {{formatDate job.updated}}</div>
{{else}}
	<div class="column posted"><span>Not Posted</span></div>
{{/if_eq}}
<!-- Referral Bonus -->
{{#if_not_null job.referralBonus}}
	<div class="column bonus">${{job.referralBonus}} Referral Bonus</div>
{{else}}
	<div class="column bonus"><span>No Referral Bonus</span></div>
{{/if_not_null}}
<!-- More -->
<div class="column more"></div>			