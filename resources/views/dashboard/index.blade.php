@extends('layouts.app')

@section('top')

@endsection

@section('content')
    <div class="row">
        <div class="col-lg-3 col-sm-6">
            <div class="panel widget bg-primary">
                <div class="row row-table">
                    <div class="col-xs-4 text-center bg-primary-dark pv-lg">
                        <em class="icon-screen-smartphone fa-3x"></em>
                    </div>
                    <div class="col-xs-8 pv-lg">
                        <div class="h2 mt0">{{ $users }}</div>
                        <div class="text-uppercase">Users</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('modals')

@endsection

@push('scripts')
<script>

</script>
@endpush